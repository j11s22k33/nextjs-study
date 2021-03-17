import { useStateCallbackWrapper } from "@/utils/common";
import { useEffect, useRef, useState } from "react";

export default function Test({ updateUI }) {
  const [cnt, uCnt] = useStateCallbackWrapper(0);
  const num = useRef(0);
  const [you, sYou] = useState(100);
  const el = useRef(null);

  useEffect(() => {
    function run() {
      sYou((c) => c + 1);
      updateUI({
        useEffect() {
          num.current = num.current + 1;
          console.log(num);
          el.current.style.opacity = "0.5";
        }
      });
    }

    run();

    // let id = setInterval(() => {
    // }, 2000);

    // return () => clearInterval(id);
    document.onkeydown = (event) => {
      run();
    };
  }, []);

  return (
    <div ref={el}>
      you=>{you}
      <br />
      num=>{num.current}
    </div>
  );
}
