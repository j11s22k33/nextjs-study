import React, {
  useEffect,
  useRef,
  useImperativeHandle,
  forwardRef
} from "react";

const $name = "[MyUseRef]";

// https://ko.reactjs.org/docs/react-api.html#reactforwardref
// ref 파라미터 받으려면.
const CustomH2 = forwardRef(({ children }, ref) => {
  return <h2 ref={ref}>{children}</h2>;
});

// ref 파라미터 받으려면.
const CustomH1 = forwardRef(({ color, children }, ref) => {
  // https://ko.reactjs.org/docs/hooks-reference.html#useimperativehandle
  const h1Ref = useRef();

  // ref에 핸들러 달기
  useImperativeHandle(ref, () => ({
    changeColor(changeColor) {
      h1Ref.current.style.color = changeColor;
    }
  }));

  return (
    <h1 style={{ color }} ref={h1Ref}>
      {children}
    </h1>
  );
});
///////////////////////////////////////////////////////////////

export default function MyUseRef({ updateUI }) {
  const customH1Ref = useRef();
  const customH2Ref = useRef();
  const myRef = useRef({ count: 0 });

  useEffect(() => {
    console.log($name, "component mount");

    setTimeout(() => {
      myRef.current.count += 1;
      customH1Ref.current.changeColor("blue");
      customH2Ref.current.innerHTML = "반갑습니다";
    }, 3000);

    return () => {
      console.log($name, "component un-mount");
    };
  }, []);

  return (
    <>
      <h1>{myRef.current.count}</h1>
      <CustomH1 color="red" ref={customH1Ref}>
        안녕하세요
      </CustomH1>
      <CustomH1 color="yellow">안녕하세요</CustomH1>
      <CustomH1 color="green">안녕하세요</CustomH1>
      <CustomH2 ref={customH2Ref}>안녕하세요</CustomH2>>
    </>
  );
}
