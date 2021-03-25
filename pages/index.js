import React, { useEffect } from "react";

const pageName = "[index.js]";

export default function Index({ updateUI }) {
  useEffect(() => {}, []);

  return (
    <>
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
    </>
  );
}
