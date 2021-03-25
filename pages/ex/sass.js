import Head from "next/head";
import React, { useEffect } from "react";
import componentLevelStyle from "@/styles/componentLevel.module.scss";

export default function Sass({ updateUI }) {
  useEffect(() => {
    //
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
      <div className={componentLevelStyle["error"]}>0123456789</div>
      <div className="error">abcdefghi</div>
      <div className="error">ABCDEFG</div>

      <style jsx>{`
        .error {
          color: red;
          background-color: yellow;
        }
      `}</style>

      <style global jsx>{`
        .error {
          color: white;
          background-color: black;
        }
      `}</style>
    </>
  );
}
