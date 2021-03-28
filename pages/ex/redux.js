import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Action } from "@/data/redux/reducer/user";
const $name = "[MyReduxUseSelector]";

export default function MyReduxUseSelector({ updateUI }) {
  const user = useSelector((state) => state.user);
  const post = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log($name, "component mount");

    dispatch(Action.update({ id: "0123456789", age: 20 }));
    console.log(user);
    console.log(post);

    return () => {
      console.log($name, "component un-mount");
    };
  }, []);

  return (
    <>
      <h1></h1>
      <style jsx>{``}</style>
    </>
  );
}
