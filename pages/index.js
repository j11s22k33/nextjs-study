import React, { Fragment, useEffect, useRef } from "react";
import Head from "next/head";
import Link from "next/link";

const $name = "[MyIndex]";

export default function MyIndex({ updateUI }) {
  const path = useRef([
    "/ex/1234/dynamicRoute",
    "/ex/popup",
    "/ex/css",
    "/ex/image",
    "/ex/preload",
    "/ex/useContext",
    "/ex/redux",
  ])
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
      {
        path.current.map((item, idx) => (
          <Fragment key={idx}>
            <Link href={item}>{item}</Link><br />
          </Fragment>
        ))
      }
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
