import React, { useEffect } from "react";
import imageStyle from "@/styles/ex/image.module.scss";
import Image from "next/image";

const $name = "[MyImage]";

export default function MyImage({ updateUI }) {
  useEffect(() => {
    console.log($name, "component mount");

    return () => {
      console.log($name, "component un-mount");
    };
  }, []);

  return (
    <>
      <Image
        src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/bbb.jpg`}
        alt=""
        width={100}
        height={100}
        quality={10} // 퀄리티 조정으로 용량 최적화
      />
      <div className="bg-img"></div>
      <div className={imageStyle["bg-img2"]}></div>
      <style jsx>{`
        .bg-img {
          background-image: url("${process.env.NEXT_PUBLIC_BASE_PATH}/images/bbb.jpg");
          background-size: contain;
          width: 100px;
          height: 100px;
        }
      `}</style>
    </>
  );
}
