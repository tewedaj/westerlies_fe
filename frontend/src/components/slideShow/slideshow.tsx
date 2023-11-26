import React, { useState, useEffect } from "react";
import "./style.slideShow.css";
import feature from "../../assets/home/featured2.png";
import blog1 from "../../assets/home/blog1.png";
import blog2 from "../../assets/home/blog2.png";
import blog3 from "../../assets/home/blog3.png";
import arrowbutton from "../../assets/home/arrow_in_circle.svg";

const Slideshow = ({ slides, navigator }: any) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Increment the current index, and loop back to 0 if it exceeds the length
      setCurrentIndex((currentIndex) => currentIndex + 1);
      console.log("what's ", currentIndex);
    }, 10000); // 10 seconds interval

    // Clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [slides.length]);

  return (
    <>
      {slides.map((slide: any, index: number) => (
        //  (index == currentIndex) &&
        <div
          key={index}
          className={`learn-more ${index === currentIndex ? "" : "hide"}`}
        >
          <img className="arrowbutton" src={arrowbutton} />
          <div className="store-description">
            <h1>{slide.name}</h1>
            <h3>{slide.location}</h3>
            <p>{slide.description}</p>
            <button
              onClick={() => {
                navigator("/shop_page/" + slide.id);
              }}
              type="button"
            >
              LEARN MORE
            </button>
          </div>

          <div className="learn-more-images">
            <img className="featured" src={feature} />
            <img
              className="store-img"
              src={slide.profilePicture
                ?.replace("http://", "https://")
                .replace("api.westerlies.io", "apibeta.westerlies.com")}
            />
          </div>
          <img className="arrowbutton" src={arrowbutton} />
        </div>
      ))}
    </>
  );
};

export default Slideshow;
