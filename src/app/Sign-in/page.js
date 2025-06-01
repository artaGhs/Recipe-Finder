"use client"
import Button from "../components/Button";
import Header from "../components/Header";
import Link from "next/link";
import ModelViewer from "../components/ModelViewer";
import { useState } from "react";
import supabase from "../helper/supabaseClient";

export default function Signin() {
  const [showPass, setShowPass] = useState(false);
  const [passSelected, setPassSelected] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const [email,setEmail] = useState("");
  const [pass,setPass] = useState("");

  const handlePass = () => {
    setShowPass(!showPass);
  }

  const handleFocus = () => {
    setIsFocused(true);
    console.log("Input is focused");
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefeault();
    // const {data, error} = await supabase.auth.signUp();
  }

  return (
    <div className="flex">
      <div>
        <Header />
      </div>
      <form  onSubmit={handleSubmit} className="mt-[35%] md:mt-[15%] lg:mt-[15%] w-5/6 md:w-2/3 lg:w-1/2 mx-auto h-100 rounded-3xl border-1 border-stone-300 bg-[rgba(41,44,115,0.3)] flex flex-col justify-evenly items-center ">
        <div className=" w-3/4 md:w-2/3 lg:w-2/3">

          <input required value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder="email" className="border-1 border-stone-300 p-3 text-2xl rounded-xl w-full outline-none focus:-translate-y-0.5 duration-250 ">
          </input>

        </div>
        <div className="w-3/4 md:w-2/3 lg:w-2/3 ">
        <div className={`flex items-center border-1 border-stone-30- p-3 text-2xl rounded-xl w-full bg-transparent transition-transform duration-250 ${isFocused ? "-translate-y-0.5" : "translate-y-0"}`}>
            <input 
              placeholder="password" 
              type={showPass ? "text" : "password"} 
              className="w-full  outline-none"
              value={pass}
              onFocus={handleFocus}
              onBlur={handleBlur}
              onChange={(e) => {setPass(e.target.value)}}
              required

            />
            <button type="button" onClick={handlePass} className="text-4xl hover:cursor-pointer active:translate-y-0.5 duration-150 ">
              👁
            </button>
        </div>
          
          
        </div>
        <span className="font-semibold -mb-15">
          <Button text="Login!" textSize="1.75rem" />
        </span>
        
        <label className="translate-y-7 text-center text-lg md:text-xl lg:text-xl">
          Don't have an account?<Link href="/Sign-up"><span className="underline">Create one!</span></Link>
        </label>
       
        
        
      </form>
    </div>
  );
}