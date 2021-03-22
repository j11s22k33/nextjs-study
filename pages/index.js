import React, { useEffect } from "react";

const pageName = "[index.js]";

const Index = ({ updateUI }) => {
  console.log(
    "process.env.NEXT_PUBLIC_BASE_PATH => ",
    process.env.NEXT_PUBLIC_BASE_PATH
  );

  useEffect(() => {
    console.log(`${pageName} component mount`);
    return () => {
      console.log(`${pageName} component unmount`);
    };
  }, []);

  return (
    <div>
      <style jsx>{`
        .my-img {
          width: 100px;
        }
      `}</style>
      <img
        src={`${process.env.NEXT_PUBLIC_BASE_PATH}/assets/images/aaa.jpg`}
        alt="aaa.jpg"
        className="my-img"
      />
    </div>
  );
};

export default Index;
