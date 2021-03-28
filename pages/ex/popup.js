import React, { useEffect, useState } from "react";

const $name = "[MyIndex]";

// customHook + customComponent
function usePopup(initVal) {
  const [msg, setMsg] = useState(initVal);

  // 컨트롤러
  const ctrl = {
    show(msg) {
      setMsg(msg);
    },
    hide() {
      setMsg(null);
    }
  };

  // 컴포넌트
  const component = ({ children }) => {
    return (
      msg && (
        <>
          <div className="bg">
            <h1 className="flexbox">{children}</h1>
            <h1 className="flexbox">{msg}</h1>
          </div>
          <style jsx>{`
            .bg {
              width: 1280px;
              height: 720px;
              background-color: rgba(0, 0, 0, 0.3);
            }
          `}</style>
        </>
      )
    );
  };
  return [ctrl, component];
}

export default function MyIndex({ updateUI }) {
  const [MyPopupCtrl, MyPopup] = usePopup(0);

  useEffect(() => {
    console.log($name, "component mount");

    MyPopupCtrl.show("하이");
    setTimeout(MyPopupCtrl.hide, 5000);

    return () => {
      console.log($name, "component un-mount");
    };
  }, []);

  return (
    <>
      <MyPopup>반가워요</MyPopup>
      <style jsx>{``}</style>
    </>
  );
}
