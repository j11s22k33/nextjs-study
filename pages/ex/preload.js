import React, { useEffect } from "react";
import Head from "next/head";

const $name = "[MyPreload]";

const imgUrl = "https://miro.medium.com/max/1442/1*gy0El9Ue9CXTSbrYF9HNVw.jpeg";

export default function MyPreload({ updateUI }) {
  useEffect(() => {
    console.log($name, "component mount");

    return () => {
      console.log($name, "component un-mount");
    };
  }, []);

  return (
    <>
      <Head>
        <title>preload</title>
        <link rel="preload" as="image" href={imgUrl} />
      </Head>
      <div className="img"></div>
      <style jsx>{`
        .img {
          width: 300px;
          height: 300px;
          background-image: url(${imgUrl});
        }
      `}</style>
    </>
  );
}
