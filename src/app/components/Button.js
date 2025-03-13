

export default function Button({text,style,btnType,bgColor="(55,48,163",opacity=1,shadowOpacity=0.7,fgColor='(255,255,255',textSize="",onclick,border,pd} ) {
  
  return (

    <>
      <button onClick={onclick} className={`rounded-2xl  text-3xl p-5  hover:cursor-pointer hover:-translate-y-0.5 duration-200 hover:shadow-black/50 hover:shadow-lg active:translate-y-0.5 active:shadow-none ${style}  `} 
        type="submit"
        style={{background : `rgba${bgColor},${opacity})`,fontSize:textSize,border:border,padding:pd}}
      >
        <div 
          style={{textShadow: `0px 0px 20px rgba${fgColor},${shadowOpacity})`,color:`rgba${fgColor},${opacity})`}}
        >
          {text}
        </div>
        
      </button>

    </>
  );
}