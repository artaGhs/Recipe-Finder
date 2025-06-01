import Button from "../components/Button";
import Header from "../components/Header";
import Link from "next/link";
import ModelViewer from "../components/ModelViewer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-[500vh] items-stretch   ">
      <Header/>
      <div className="fixed w-[100%] left-1/2  -translate-x-1/2  ">

        <div className="text-3xl md:text-5xl lg:text-5xl flex justify-center mt-45  w-full font-semibold  text-center">
          Find the best recipes with your ingredients!
        </div>
        <div className="flex mt-10 justify-center">
          <Link href="/recipe">
            <Button text="Click Here To Start!" style="font-black" />
          </Link>
        </div>
        <ModelViewer />
      </div>
      
    </div>
  );
}