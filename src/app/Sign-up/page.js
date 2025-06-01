"use client"
import Button from "../components/Button";
import Header from "../components/Header";
import Link from "next/link";
import ModelViewer from "../components/ModelViewer";
import { use, useState } from "react";
import supabase from "../helper/supabaseClient";

export default function Signin() {
  const [showPass, setShowPass] = useState(false);
  const [showRePass, setShowRePass] = useState(false);
  const [passSelected, setPassSelected] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const [email,setEmail] = useState("");
  const [rePass, setRePass] = useState("");
  const [pass,setPass] = useState("");
  const [account,setAccount] = useState(null);

  const handlePass = () => {
    setShowPass(!showPass);
  }

  const handleRePass = () => {
    setShowRePass(!showRePass);
  }

  const handleFocus = () => {
    setIsFocused(true);
    console.log("Input is focused");
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleSubmit = async (event) => {
    console.log("CHEEECK")
    event.preventDefault();
    if(pass != rePass){
      console.log("Passwords don't match!")
      setAccount("Passwords don't match!")
      return
    }
    
    const {data, error} = await supabase.auth.signUp({
      email: email,
      password:pass,
    });
    
    if(error){
      console.log(error)
      setAccount(error.message)
      return
    }
    if(data){
      console.log("Acc created!!!")
      setEmail("");
      setPass("");
      setAccount("Account created!");
    }
  }



  return (
    <div className="flex">
      <div>
        <Header />
      </div>
      <form  onSubmit={(e) => {handleSubmit(e)}} className="mt-[35%] md:mt-[15%] lg:mt-[15%] w-5/6 md:w-2/3 lg:w-1/2 mx-auto h-120 rounded-3xl border-1 border-stone-300 bg-[rgba(41,44,115,0.3)] flex flex-col justify-evenly items-center ">
        {account ? <label className="text-2xl text-yellow-400">{account}</label>:<></>}
        <div className=" w-3/4 md:w-2/3 lg:w-2/3">

          <input required value={email} onChange={(e) => {setEmail(e.target.value)}} placeholder="email" className="border-1 border-stone-300 p-3 text-2xl rounded-xl w-full outline-none focus:-translate-y-0.5 duration-250 ">
          </input>
        

        </div>
       
        <div className="w-3/4 md:w-2/3 lg:w-2/3 ">
          <div className={`flex items-center border-1 border-stone-300 p-2 text-2xl pl-3  rounded-xl w-full bg-transparent transition-transform duration-250 ${isFocused ? "-translate-y-0.5" : "translate-y-0"}`}>
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

        {/* Re-type password */}
        <div className="w-3/4 md:w-2/3 lg:w-2/3 ">
          <div className={`flex items-center border-1 border-stone-300 p-2 text-2xl pl-3  rounded-xl w-full bg-transparent transition-transform duration-250 ${isFocused ? "-translate-y-0.5" : "translate-y-0"}`}>
              <input 
                placeholder="re-type password" 
                type={showRePass ? "text" : "password"} 
                className="w-full  outline-none"
                value={rePass}
                onFocus={handleFocus}
                onBlur={handleBlur}
                onChange={(e) => {setRePass(e.target.value)}}
                required
              />
              
              <button type="button" onClick={handleRePass} className="text-4xl hover:cursor-pointer active:translate-y-0.5 duration-150 ">
                👁
              </button>
          </div>
        </div>
        <span className="font-semibold -mb-7">
          <Button text="Sign up!" textSize="1.75rem" />
        </span>
        
        <label className="translate-y-3 text-center text-lg md:text-xl lg:text-xl">
          Already have an account?<Link href="/Sign-in"><span className="underline">Login!</span></Link>
        </label>
       
        
        
      </form>
    </div>
  );
}