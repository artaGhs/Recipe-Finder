import Button from "./Button";
import Link from "next/link";
import LoadingAnimation from "./LoadingAnimation";
import { useState, useEffect } from "react";


export default function RecipesFound({json,loading}) {
  const [recipeSelected,setRecipeSelected] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [modalClass, setModalClass] = useState("scale-95 opacity-0");
  
  useEffect(() => {
    if (showModal) {
      // Slight delay to trigger the CSS transition on mount
      setTimeout(() => {
        setModalClass("scale-100 opacity-100");
      }, 10);
    } else {
      setModalClass("scale-95 opacity-0");
    }
  }, [showModal]);

  const handleCloseMdl= () => { 
    setShowModal(false);
    setRecipeSelected(null);
  } 

  const handleRecipeClick = (recipe) => {
    setRecipeSelected(recipe);
    setShowModal(true);
  };

  return (
    <div className=" w-full">
      <fieldset className="border-2 rounded-3xl w-95/100 md:w-3/4 lg:w-3/4 mx-auto p-3 mt-10 bg-gradient-to-r from-indigo-900 to-indigo-950  ">
        <legend className="mx-10 text-2xl md:text-3xl lg:text-3xl font-extrabold  text-[#fcd34d]  ">
          {loading ? <LoadingAnimation/>: <div>{json.length } Recipe(s) Found (Click on each recipe for instructions): </div>}
          
        </legend>

        
        <div className="flex-row   w-[95%]  mx-auto gap-10  ">
          
          {
            json.map((recipe,index) => (
              <div key={index} onClick={() => handleRecipeClick(recipe)} className="mb-10 mt-5 p-5 rounded-2xl ring-2 bg-[rgba(255,255,255,0.15)] flex flex-row justify-between duration-200 hover:cursor-pointer hover:-translate-y-1 hover:shadow-[0px_10px_15px_rgba(0,0,0,0.5)] shadow-[0px_0px_25px_rgba(255,255,255,0.3)]">
                <div className=" w-[60%] ">
                  <label className="font-black text-2xl hover:cursor-pointer">
                    {recipe.recipeName}
                    <div className="font-semibold text-lg ml-2  text-amber-50">({recipe.description})</div>
                  </label>
                
                  <p className="pl-5 mt-5 hover:cursor-pointer">
                    <span className="font-bold hover:cursor-pointer " >Ingredients: </span> 

                      <label key={index} className="hover:cursor-pointer" >
                        {recipe.ingredients.join(", ")}
                      </label>
                  </p>

                </div>
                <label className="font-bold w-1/4 text-md md:text-2xl lg:text-2xl hover:cursor-pointer self-center text-end ">
                  {recipe.caloriesPerServing} cal per {recipe.servingSize}
                  
                </label>
              </div>
            ))
          }

        </div>
        

      </fieldset>

      {showModal && setRecipeSelected && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          {/* Dark overlay behind the modal */}
          <div
            className="absolute inset-0 bg-[rgba(0,0,0,0.1)] backdrop-blur-md"
            onClick={handleCloseMdl}
          ></div>

          {/* Modal content */}
          <div className={`rmb-10 w-90/100 md:w-60/100 lg:w-60/100 mt-5 rounded-3xl ring-2 p-7 md:p-10 lg:p-10 bg-gradient-to-r to-[rgba(55,48,163,0.9)] from-[rgba(75,68,183,0.9)]  duration-200  hover:-translate-y-1 hover:shadow-[0px_10px_15px_rgba(0,0,0,0.5)] shadow-[0px_0px_25px_rgba(255,255,255,0.3)] ${modalClass}`}>
            <h2 className="text-2xl md:text-5xl lg:text-5xl font-bold mb-6 w-[65%] md:w-[85%] lg:w-[85%] ">
              {recipeSelected.recipeName}
            </h2>
            <p className="mb-4 text-xl">
              <strong>Calories:</strong>{" "}
              {recipeSelected.caloriesPerServing} per {recipeSelected.servingSize}
            </p>
            <p className="mb-4 text-xl">
              <strong>Ingredients:</strong>{" "}
              {recipeSelected.ingredients.join(", ")}
            </p>
            {/* If you have instructions or other data, display them similarly */}
            {recipeSelected.instructions && (
              <p className="mb-4 text-xl">
                <strong>Instructions:</strong> {recipeSelected.instructions}
              </p>
            )}
            <div className="flex  justify-end absolute top-0 right-0 m-7 md:m-10 lg:m-10 ">
              <Button text="Close" textSize="1rem" onclick={handleCloseMdl} bgColor="(95,78,193" border="solid 1px white" pd="0.75rem" />
            </div>
            {/* <button
              onClick={handleCloseMdl}
              className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700 hover:cursor-pointer"
            >
              Close
            </button> */}
          </div>
        </div>

      )}
    </div>
  );
}