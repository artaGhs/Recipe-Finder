import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    // Parse the request body sent from your client
    const { ingredients, flexibility } = await request.json();
    
    // Retrieve your private API key from environment variables
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }
    
    // Construct your prompt exactly as you used before
    const prmpt = `You are a professional chef, based on the user's ingredients, 
find the best recipes, the input also includes a flexibility % which means how 
much new ingredients you can use. if 0%, you can only use the ingredients listed,
if 100% you can have a decent amount of variance. if there is no recipe found or
the input is not an actual ingredient, return "No recipes found based on the current restrictions:(". 
You can consider that the user already has basic ingredients such as water, sugar, salt, etc. However if the flexibility is 0, don't assume that 
the user has those ingredients!
GIVE NO MORE THAN 15 RECIPES!
YOUR OUTPUT SHOULD BE IN JSON FORMAT:
Recipe = {'recipeName': string,'description': string, 'ingredients' : Array of strings, 'instructions' : string, 'servingSize' : string (ONLY IN APPROPRIATE UNITS, e.g 1 tablespoon, 20 grams, 1 slice (for pizza)), 'caloriesPerServing': int}
Return: Array<Recipe>
USER INPUT{
  Ingredients: ${ingredients} / 
  Flexibility: ${flexibility}
}
`;

    // Call the external API using fetch
    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`
        },
        body: JSON.stringify({ prompt: prmpt })
      }
    );

    // If the external API returns an error, forward that error
    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(errorData, { status: response.status });
    }

    // Parse and return the external API’s response
    const data = await response.json();
    return NextResponse.json({ result: data });
    
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}