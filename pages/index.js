import React, { useEffect } from "react";

const pageName = "[MyIndex]";

export default function MyIndex({ updateUI }) {
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
