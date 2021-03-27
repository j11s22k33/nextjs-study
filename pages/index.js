import React, { useEffect } from "react";
import Head from "next/head";

const $name = "[MyIndex]";

export default function MyIndex({ updateUI }) {
  useEffect(() => {
    console.log($name, "component mount");

    return () => {
      console.log($name, "component un-mount");
    };
  }, []);

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="red">Index</h1>
      <style jsx>{`
        $color-red: red;
        .red {
          color: $color-red;
        }
      `}</style>
    </>
  );
}
