import { useEffect, useState } from "react";

import "./style.heroImage.css";

export default function HeroImage({urls}:any){
    const [currentIndex, setCurrentIndex] = useState<number>(0);

    // useEffect(() => {
    //   const intervalId = setInterval(() => {
    //     // Increment the current index, and loop back to 0 if it exceeds the length
    //     setCurrentIndex((currentIndex) => (currentIndex + 1) );
    //     console.log("what's " ,currentIndex);
    //   }, 10000); // 10 seconds interval
  
    //   // Clear the interval when the component is unmounted
    //   return () => clearInterval(intervalId);
    // }, [urls.length]);
    return(
        <img className="heroHeaderImg" src={urls[currentIndex]?.profilePicture?.replace("http://","https://").replace("api.westerlies.io","apibeta.westerlies.com")} alt="Hero" />

    )
}