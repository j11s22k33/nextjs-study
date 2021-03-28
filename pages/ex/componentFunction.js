import React, { useEffect, useRef, useState } from "react";

const $name = "[Count]";

export default function Count({ updateUI }) {
  console.log($name, "constructor"); // 함수형이라 매번 함수가 불리니. hook 으로 인스턴스 변수생성
  const [state, setState] = useState({ count: 0 });
  const myRef = useRef({ count: 0 });
  const timerID = useRef();

  useEffect(() => {
    componentDidMount();
    return componentWillUnmount;
  }, []);

  useEffect(componentDidUpdate);

  function componentDidMount() {
    console.log($name, "componentDidMount");

    timerID.current = setInterval(() => tick(), 1000);
    // timerID.current = setInterval(() => tick2(), 1000);
  }

  function componentWillUnmount() {
    console.log($name, "componentWillUnmount");
    clearInterval(timerID.current);
  }

  function componentDidUpdate() {
    console.log($name, "componentDidUpdate");
  }

  function tick() {
    setState((state) => {
      return {
        count: state.count + 1
      };
    });
    // setState({
    //   count: state.count + 1
    // });
  }

  function tick2() {
    myRef.current.count += 1;
    updateUI({
      useEffect() {
        console.log($name, "updateUI callback");
      }
    });
  }

  function render() {
    console.log($name, "render");
    return (
      <div>
        <h2>tick state.count {state.count}.</h2>
        <h2>tick2 reRef.current.count {myRef.current.count}.</h2>
      </div>
    );
  }

  return render();
}
