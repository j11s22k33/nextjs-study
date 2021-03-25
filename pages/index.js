import React, { useEffect } from "react";
import bbb from "@/styles/test.module.scss";
const pageName = "[index.js]";

const Index = ({ updateUI }) => {
  useEffect(() => {
    console.log(`${pageName} component mount`);
    return () => {
      console.log(`${pageName} component unmount`);
    };
  }, []);

  return (
    <div className={bbb.error}>
      하이
      <style jsx>{`
        .my-img {
          width: 100px;
        }
      `}</style>
      <img
        src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/aaa.jpg`}
        alt="aaa.jpg"
        className="my-img"
      />
    </div>
  );
};

export default Index;
