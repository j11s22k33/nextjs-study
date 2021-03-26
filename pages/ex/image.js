import React, { useEffect } from "react";

const pageName = "[MyImage]";

export default function MyImage({ updateUI }) {
  useEffect(() => {
    console.log(pageName, "component mount");

    return () => {
      console.log(pageName, "component un-mount");
    };
  }, []);

  return (
    <>
      <img
        src={`${process.env.NEXT_PUBLIC_BASE_PATH}/images/aaa.jpg`}
        alt="aaa.jpg"
        className="my-img"
      />
      <style jsx>{`
        .my-img {
          width: 100px;
        }
      `}</style>
    </>
  );
}
