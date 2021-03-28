import React, { useEffect, useRef, forwardRef } from "react";

const $name = "[MyIndex]";

///////////////////////////////////////////////////////////////
const CustomH1 = ({ children }) => {
  return <h1>{children}</h1>;
};
///////////////////////////////////////////////////////////////
const CustomInput = forwardRef(({ children }, ref) => {
  return (
    <>
      <label for="name">{children}</label>
      <input type="text" id="name" name="name" ref={ref} />
    </>
  );
});
///////////////////////////////////////////////////////////////

export default function MyIndex({ updateUI }) {
  const customInputRef = useRef();

  useEffect(() => {
    console.log($name, "component mount");

    customInputRef.current.focus();

    return () => {
      console.log($name, "component un-mount");
    };
  }, []);

  return (
    <>
      <CustomH1>한글이 어렵다</CustomH1>
      <CustomInput ref={customInputRef}>입력란:</CustomInput>
    </>
  );
}
