// app/api/generateRecipes/route.js

import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    // Parse the request body
    const { ingredients, flexibility } = await request.json();
    
    // Initialize the Gemini API with your server-side API key
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    const prompt = `You are a professional chef, based on the user's ingredients, 
    find the best recipes, the input also includes a flexibilty % which means how 
    much new ingredients you can use. if 0%, you can only use the ingredients listed,
    if 100% you can have a decent amount of variance. if there is no recpice found or
    the input is not an actual ingredient, return "No recipes found based on the current restrictions:(". 
    You can consider that the user already has basic ingredients such as water, sugar, salt, etc. However if the flexibility is 0, don't assume that 
    the user has those ingredients!
    GIVE NO MORE THAN 15 RECIPES!
    YOUR OUTPUT SHOULD BE IN JSON FORMAT:
    Recipe = {'recipeName': string,'description': string, 'ingredients' : Array of strings, 'instructions' : string, 'servingSize' : string (ONLY IN APPROPRIATE UNITS, e.g 1 tblspoon,20 grams, 1 slice (for pizza)), 'caloriesPerServing': int}
    Return: Array<Recipe>
    USER INPUT{
      Ingredients: ${ingredients} / 
      Flexibility: ${flexibility}
    }`;
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    // Clean the output
    let cleanedOutput = text.trim();
    if (cleanedOutput.startsWith('```json')) {
      cleanedOutput = cleanedOutput.substring(cleanedOutput.indexOf('\n') + 1);
    }
    if (cleanedOutput.endsWith('```')) {
      cleanedOutput = cleanedOutput.substring(0, cleanedOutput.lastIndexOf('```')).trim();
    }
    
    // Parse and return the JSON
    const jsonObject = JSON.parse(cleanedOutput);
    return NextResponse.json(jsonObject);
    
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    return NextResponse.json({ error: "Failed to generate recipes" }, { status: 500 });
  }
}