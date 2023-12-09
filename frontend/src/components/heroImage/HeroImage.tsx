import { useEffect, useState } from "react";

import "./style.heroImage.css";
import { getStoreDetailInfo } from "../../pages/shopePage/shopeController";
import { useParams } from "react-router-dom";

export default function HeroImage({ urls }: any) {
  const [currentIndex] = useState<number>(0);
  const param = useParams();
  const [, setStoreInfo] = useState<any>();
  const [storeId] = useState<any>(param.id);
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     // Increment the current index, and loop back to 0 if it exceeds the length
  //     setCurrentIndex((currentIndex) => (currentIndex + 1) );
  //     console.log("what's " ,currentIndex);
  //   }, 10000); // 10 seconds interval

  //   // Clear the interval when the component is unmounted
  //   return () => clearInterval(intervalId);
  // }, [urls.length]);
  useEffect(() => {
    getStoreDetailInfo(storeId, 0).then((res) => {
      setStoreInfo(res);
      var locationList: any[] = [];
      res?.addresses?.map((item: any) => {
        locationList.push({
          latitude: item?.location?.latitude,
          longitude: item?.location?.longitude,
        });
      });
      console.log(res);
    });
  }, []);
  return (
    <>
      <img
        className="heroHeaderImg"
        src={urls[currentIndex]?.profilePicture
          ?.replace("http://", "https://")
          .replace("api.westerlies.io", "apibeta.westerlies.com")}
        alt="Hero"
      />
      <p className="heroimagename">shop name</p>
      <p className="heroimgtxt"> This image belongs to this shop.</p>
    </>
  );
}
