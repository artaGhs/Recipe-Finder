"use client"
import Button from "../components/Button";
import Header from "../components/Header";
import RecipesFound from "../components/RecipesFound";
import Link from "next/link";
import ModelViewer from "../components/ModelViewer";
import { useState, useEffect } from "react";
import dotenv from "dotenv";
import { GoogleGenerativeAI } from "@google/generative-ai";
import sample from "../sample.json"

dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_API_KEY)




async function run(prmpt) {
  

  console.log("gemini")
  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
  });
  
  const prompt = prmpt;
  
  
  const result = await model.generateContent(prompt);


  return result.response.text();
}



export default function Recipe() {
  const [isLoading, setIsLoading] = useState(false)
  const [resp, setResp] = useState(sample);

  const [ingredients, setIngredients] = useState('');
  const [flexibility , setFlexibility] = useState(0);

  const handleSubmit = async (event) => {
    setIsLoading(true);
    event.preventDefault();


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
    `
    const geminiOutput = await run(prmpt);
  
    let cleanedOutput = geminiOutput.trim();
    if (cleanedOutput.startsWith('```json')) {
      // Remove the starting markdown code fence
      cleanedOutput = cleanedOutput.substring(cleanedOutput.indexOf('\n') + 1);
    }
    if (cleanedOutput.endsWith('```')) {
      // Remove the ending markdown code fence
      cleanedOutput = cleanedOutput.substring(0, cleanedOutput.lastIndexOf('```')).trim();
    }

    try {
      const jsonObject = JSON.parse(cleanedOutput);
      console.log(jsonObject,"jsoooooon");
      console.log(typeof jsonObject);
      setIsLoading(false);
      setResp(jsonObject);

    } catch (error) {
      console.error("Error parsing JSON:", error);
    }
    
    
    console.log(resp,"response")
    console.log("Form submitted");
    console.log(ingredients);
    console.log(flexibility);
  }

  // const handleS = (event) => {
  //   event.preventDefault();
  //   console.log("hellWorldo");
  // }
  

  return (
    
    <div className="flex flex-col overscroll-contain ">
      <Header />
      <div className=" w-[100%] p-5 ">

        <div className="text-3xl md:text-4xl lg:text-4xl text-center flex justify-center mt-45">
          Enter your available ingredients: 
        </div>

        
        <form onSubmit={handleSubmit}>
          <fieldset  >

            <label className="text-5xl flex justify-center mt-15 ">
              <input name="myInput"  value={ingredients} onChange={(e) => setIngredients(e.target.value)} className=" text-lg md:text-2xl lg:text-2xl  h-14 md:h-17 lg:h-17  w-9/10 md:w-6/10 lg:w-6/10 ring-amber-300 border-solid border-2 p-2focus:-translate-y-1 duration-200 focus:shadow-lg focus:shadow-amber-50/30 focus:outline-none rounded-2xl pl-5 -mt-10 mb-5 bg-[rgba(41,44,115,0.3)]  backdrop-brightness-200" placeholder="Flour, tomato, milk, etc." required/>
              
            </label>
            <label className="text-3xl self-center ] text-center flex justify-center mt-10 mb-5" htmlFor="flexi">
              How open are you to using ingredients you don't currently have?
            </label>
            <div className=" flex justify-center " >
              <div className=" w-5/9">
                <input id="flexi" type="range" name="flexibility" min="0" max="100" value={flexibility} onChange={(e) => setFlexibility(e.target.value)} className="w-full mt-5 appearance-none bg-amber-300 h-2 rounded-2xl  shadow-[0px_0px_20px_rgba(255,191,0,0.8)] outline-none [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-white" />
              </div>

              <label htmlFor="flexi" className="text-2xl  flex items-center mt-2 ml-3 font-bold">
                {flexibility}%
              </label>
            </div>
            <div className="text-5xl flex justify-center self-center items-center mt-10 font-black ">
              <Button text="Find Recipe!" type="submit" textSize="2rem" border="solid 1px white"/>
              
            </div>
            {/* {isLoading ? <label>Loading</label>:<></>}
            <div className=" text-center mt-10 text-2xl">Loading...</div> */}
            <div className="flex items-center">
              {/* {resp == null ? <label className="mx-auto w-full text-center mt-15 font-semibold text-4xl">Waiting for ingredients...</label> :<RecipesFound json={resp}/>} */}
              <RecipesFound json={resp} loading={isLoading}/>
            </div>
          </fieldset>
        </form>
      </div>
      
      
    </div>
  );
}