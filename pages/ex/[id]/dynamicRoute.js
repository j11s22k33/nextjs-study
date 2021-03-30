import React, { useEffect, useRef } from "react";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";

const $name = "[MyDynamicRoute]";

/**
 * next export 에는 dynamic route는 쓸모없다. queryString 방식이 좋다
 */
export default function MyDynamicRoute({ updateUI }) {  
  useEffect(() => {
    console.log($name, "component mount");

    return () => {
      console.log($name, "component un-mount");
    };
  }, []);

  return (
    <>
      <Head>
        <title>MyDynamicRoute</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>      
      <h1 className="red">{Router.query.id}</h1>
      <style jsx>{`
        $color-red: red;
        .red {
          color: $color-red;
        }
      `}</style>
    </>
  );
}
