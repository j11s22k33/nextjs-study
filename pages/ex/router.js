import React, { useEffect } from "react";
import Router from "next/router";
import Link from "next/link";

const pageName = "[MyRouter]";

export default function MyRouter({ updateUI }) {
  function shallow(event) {
    console.log(
      pageName,
      "shallow",
      "called",
      "process.browser=" + process.browser
    );
    if (!process.browser) {
      return;
    }
    Router.push("/?num=" + Date.now(), null, { shallow: true });
  }

  useEffect(() => {
    console.log(pageName, "component mount");

    return () => {
      console.log(pageName, "component un-mount");
    };
  }, []);

  return (
    <>
      <div className="link" onClick={shallow}>
        하이
      </div>
      <style jsx>{`
        .link:hover {
          cursor: pointer;
          text-decoration: underline;
        }
      `}</style>
    </>
  );
}
