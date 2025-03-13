import { useState, useEffect } from "react";

export default function LoadingAnimation() {
  const texts = ["Loading","Loading.", "Loading..", "Loading..."];
  const [loadingText, setLoadingText] = useState(texts[0]);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index = (index + 1) % texts.length;
      setLoadingText(texts[index]);
    }, 350); // change text every 500ms
    return () => clearInterval(interval);
  }, []);

  return <div>{loadingText}</div>;
}

