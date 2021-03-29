import Head from "next/head";
import React, { useEffect } from "react";
import cssStyle from "@/styles/ex/css.module.scss";

const $name = "[MyCss]";

export default function MyCss({ updateUI }) {
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
      {/*
       - index.scss .error
       - componentLevel.module.scss .error
       - <style jsx> .error
       - <style global jsx> .error
       */}
      <div className="error">가나다라마바사</div>
      <div className={cssStyle["error-big"]}>0123456789</div>
      <div className="error2">abcdefghi</div>
      <div className="error3">ABCDEFG</div>

      <style jsx>{`
        .error2 {
          color: red;
          background-color: yellow;
        }
      `}</style>

      <style global jsx>{`
        .error3 {
          color: white;
          background-color: black;

          &:hover {
            background-color: red;
          }
        }
      `}</style>
    </>
  );
}
