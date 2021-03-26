import React, { useEffect } from "react";

const pageName = "[MyRedux]";

export default function MyRedux() {
  useEffect(() => {
    console.log(pageName, "component mount");

    return () => {
      console.log(pageName, "component un-mount");
    };
  }, []);

  return (
    <>
      <div>Index</div>
      <style jsx>{``}</style>
    </>
  );
}
