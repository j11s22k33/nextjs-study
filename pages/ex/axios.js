import { useEffect } from "react";

const pageName = "[Axios]";

function log() {
  console.log.call(this, ...arguments);
}

export default function Axios() {
  useEffect(() => {
    console.log(pageName + "mount component");

    log(pageName + "mount component", "hi");

    return () => {
      console.log(pageName + "un-mount component");
    };
  }, []);

  return (
    <>
      <div id="root">
        <p className="my-style">Hellow</p>
      </div>
      <style jsx>{`
        .my-style {
          color: red;
          background-color: yellow;
        }
      `}</style>
    </>
  );
}
