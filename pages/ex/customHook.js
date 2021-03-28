import React, { useEffect, useState } from "react";
import Head from "next/head";

const $name = "[MyIndex]";

function useCustomHook(initVal) {
  const [cnt, setCnt] = useState(initVal);

  const setCntMod = (val) => {
    const next = val + 999;
    setCnt(next);
    console.log(next);
  };

  return [cnt, setCntMod];
}

export default function MyIndex({ updateUI }) {
  const [cnt, setCnt] = useCustomHook(0);

  useEffect(() => {
    console.log($name, "component mount");

    setCnt(100);

    return () => {
      console.log($name, "component un-mount");
    };
  }, []);

  return (
    <>
      <style jsx>{``}</style>
    </>
  );
}
