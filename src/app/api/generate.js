import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  
  const { ingredients, flexibility } = req.body;
  
  // Use the same prompt as your client-side code
  const prmpt = `You are a professional chef, based on the user's ingredients, 
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
    }
    `;
    
  try {
    const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    const result = await model.generateContent(prmpt);
    const textResponse = result.response.text();
    res.status(200).json({ result: textResponse });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}