
import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Parse the request body
    const body = await request.json();
    const { ingredients, flexibility,restrictions } = body;
    console.log("INGGG : ",ingredients, "   FLEX:  ", flexibility);
    console.log("RESSSSSStrictionssss :     ", restrictions)
    // Initialize the Google Generative AI client
    const genAI = new GoogleGenerativeAI(process.env.API_KEY);
    
    // Get the model
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
    });
    // Format the prompt with the provided ingredients and flexibility
    const formattedPrompt = `You are a professional chef, based on the user's ingredients, 
    find the best recipes, the input also includes a flexibilty % which means how x 
    much new ingredients you can use. if 0%, you can only use the ingredients listed,
    if 100% you can have a decent amount of variance. Also there is a restriction variable, make sure to 
    exclude any recipes that include the restrictions, (eg, gluten)
    if there is no recpice found or
    the input is not an actual ingredient, return "No recipes found based on the current restrictions:(". 
    You can consider that the user already has basic ingredients such as water, sugar, salt, etc. However if the flexibility is 0, don't assume that 
    the user has those ingredients!

    GIVE NO MORE THAN 15 RECIPES!
    YOUR OUTPUT SHOULD BE IN JSON FORMAT:
    Recipe = {'recipeName': string,'description': string, 'ingredients' : Array of strings, 'instructions' : string, 'servingSize' : string (ONLY IN APPROPRIATE UNITS, e.g 1 tblspoon,20 grams, 1 slice (for pizza)), 'caloriesPerServing': int}
    Return: Array<Recipe>
    USER INPUT{
      Ingredients: ${ingredients} / 
      Flexibility: ${flexibility} /
      Restrictions: ${restrictions}
    }
    `
    
    // Generate content
    const result = await model.generateContent(formattedPrompt);
    const text = result.response.text();
    let jsonData;


    try {
      // Extract JSON from markdown code blocks if present
      let processedText = text;
      
      // Check for JSON code blocks
      if (text.includes('```json')) {
        processedText = text.split('```json')[1].split('```')[0].trim();
      } else if (text.includes('```')) {
        // Try to extract from regular code blocks
        processedText = text.split('```')[1].split('```')[0].trim();
      }
      console.log(processedText,"processed textttt")
      // Parse the JSON
      jsonData = JSON.parse(processedText);
      console.log("Successfully parsed JSON data");

    } catch (error) {
      console.error("Failed to parse JSON from response:", error);
      // If JSON parsing fails, return the raw text
      return new NextResponse(JSON.stringify({ 
        text: text,
        error: "Failed to parse JSON from AI response"
      }), {
        status: 200,
        headers: {
          'Content-Type': 'application/json',
        },
      });
    }
    
    console.log("Received json :", jsonData);
    return new NextResponse(JSON.stringify({ 
      recipes: jsonData,
      success: true
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    
  } catch (error) {
    console.error("API error:", error);
    return new NextResponse(JSON.stringify({ 
      error: `Error: ${error.message}` 
    }), { 
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}