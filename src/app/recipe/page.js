"use client"
import Button from "../components/Button";
import Header from "../components/Header";
import RecipesFound from "../components/RecipesFound";
import Link from "next/link";
import ModelViewer from "../components/ModelViewer";
import { useState, useEffect } from "react";
import sample from "../sample.json"




export default function Recipe() {
  const [isLoading, setIsLoading] = useState(false)
  const [resp, setResp] = useState(sample);

  const [ingredients, setIngredients] = useState('');
  const [flexibility , setFlexibility] = useState(0);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients, flexibility })
      });
      const data = await response.json();
      
      let cleanedOutput = data.result.trim();
      if (cleanedOutput.startsWith('```json')) {
        cleanedOutput = cleanedOutput.substring(cleanedOutput.indexOf('\n') + 1);
      }
      if (cleanedOutput.endsWith('```')) {
        cleanedOutput = cleanedOutput.substring(0, cleanedOutput.lastIndexOf('```')).trim();
      }
      
      const jsonObject = JSON.parse(cleanedOutput);
      setResp(jsonObject);
    } catch (error) {
      console.error("Error generating recipe:", error);
    }
    setIsLoading(false);
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