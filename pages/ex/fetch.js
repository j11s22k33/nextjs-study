import React, { useEffect } from "react";

const pageName = "[MyFetch]";

export default function MyFetch({ updateUI }) {
  useEffect(() => {
    console.log(pageName, "component mount");

    // https://developer.mozilla.org/ko/docs/Web/API/Fetch_API/Using_Fetch
    fetch("/api/hello")
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
      })
      .catch((err) => {
        console.log(err);
      });

    // https://developer.mozilla.org/ko/docs/Web/API/Body
    const myImage = document.querySelector(".my-image");
    fetch("https://upload.wikimedia.org/wikipedia/commons/7/77/Delete_key1.jpg")
      .then((res) => res.blob())
      .then((res) => {
        const objectURL = URL.createObjectURL(res);
        myImage.src = objectURL;
      });
    return () => {
      console.log(pageName, "component un-mount");
    };
  }, []);

  return (
    <>
      <img
        alt=""
        className="my-image"
        src="https://wikipedia.org/static/images/project-logos/frwiki-1.5x.png"
      />
      <style jsx>{``}</style>
    </>
  );
}
