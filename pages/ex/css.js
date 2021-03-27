import Head from "next/head";
import React, { useEffect } from "react";
import cssStyle from "@/styles/ex/css.module.scss";

const pageName = "[MyCss]";

export default function MyCss({ updateUI }) {
  useEffect(() => {
    console.log(pageName, "component mount");

    return () => {
      console.log(pageName, "component un-mount");
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

       컴포넌트 레벨 모듈 CSS 승리
       하지만 Element.style 에 직접 ... 
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
        }
      `}</style>
    </>
  );
}