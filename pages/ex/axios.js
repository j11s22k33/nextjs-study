import { useEffect } from "react";

const pageName = "[MyAxios]";

export default function MyAxios() {
  useEffect(() => {
    console.log(pageName, "component mount");

    return () => {
      console.log(pageName, "component un-mount");
    };
  }, []);

  return (
    <>
      <div></div>
      <style jsx>{``}</style>
    </>
  );
}
