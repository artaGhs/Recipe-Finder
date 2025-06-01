import { GoogleGenerativeAI } from '@google/generative-ai';
import { NextResponse } from 'next/server';

export async function POST(request) {
  // Check API key exists
  if (!process.env.API_KEY) {
    console.error('Missing API_KEY environment variable');
    return NextResponse.json({ 
      error: 'Server configuration error' 
    }, { status: 500 });
  }

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
      model: "gemini-2.0-flash-lite",
    });
    // Format the prompt with the provided ingredients and flexibility
    const formattedPrompt = `Create max 10 recipes using: ${ingredients}. 
    Flexibility: ${flexibility}% (0%=exact ingredients only, 100%=any ingredients).
    Exclude: ${restrictions}.
    Return only the EXACT JSON array of recipes, no other text.
    JSON format: [{"recipeName":"","description":"","ingredients":[],"instructions":"","servingSize":"","caloriesPerServing":0}]`;
    
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