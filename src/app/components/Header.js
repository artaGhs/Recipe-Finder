import Button from "./Button";
import Link from "next/link";
export default function Header() {
  return (
    <>
      <div className="h-30 flex justify-between items-center pl-10 bg-[rgba(41,44,115,0.3)] border-b border-gray-500 backdrop-brightness-200 backdrop-blur-md font-extrabold fixed w-full z-5">
        <div>
          <Link href="/home">
            <Button text="Home"  />
          </Link>
        </div>
        {/* 
        <div className="mr-10">
          <Link href="/Sign-in">
            <Button text="Sign in"/>
          </Link>
        </div> */}
       
      </div>
    </>
  );
}