import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.API_KEY)

async function run() {
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const prompt = `You are a professional chef, based on the user's ingredients, find the best recipes, the input also includes a flexibilty % which means how much new ingredients you can use. if 0%, you can only use the ingredients listed, if 100% you can have a decent amount of variance. if there is no recpice found or the input is not an actual ingredient, return "No recipes found:(".`;
  
  const result = await model.generateContent(prompt);
  console.log(result.response.text());
}

run();