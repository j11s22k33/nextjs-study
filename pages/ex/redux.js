import React, { useEffect, useSelector } from "react";
import Head from "next/head";

const $name = "[MyReduxUseSelector]";

export default function MyReduxUseSelector({ updateUI }) {
  useEffect(() => {
    console.log($name, "component mount");

    const user = useSelector((state) => {
      console.log(state);
      return state.user;
    });

    return () => {
      console.log($name, "component un-mount");
    };
  }, []);

  return (
    <>
      <h1></h1>
      <style jsx>{``}</style>
    </>
  );
}
