import Button from "./Button";
import Link from "next/link";
export default function Header() {
  return (
    <>
      <div className="h-30 flex items-center pl-10 bg-[rgba(41,44,115,0.3)] border-b-1 border-gray-500 backdrop-brightness-200 backdrop-blur-md font-extrabold fixed w-full z-5 ">
        <Link href="/home">
          <Button text="Home"  />
        </Link>
      </div>

    </>
  );
}