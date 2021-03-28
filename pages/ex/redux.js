import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Action as userAction } from "@/data/redux/reducer/user";
import { Action as postAction } from "@/data/redux/reducer/post";

const $name = "[MyReduxUseSelector]";

export default function MyReduxUseSelector({ updateUI }) {
  const user = useSelector((state) => state.user);
  const post = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log($name, "component mount");

    dispatch(userAction.update({ id: "USER_ID", age: 60 }));
    console.log(user);

    dispatch(postAction.update({ id: "POST_ID", age: 10 }));
    console.log(post);

    setTimeout(() => {
      dispatch(userAction.update({ id: "USER_ID_1", age: 60 }));
      console.log(user);

      dispatch(postAction.update({ id: "POST_ID_1", age: 10 }));
      console.log(post);
    }, 3000);

    return () => {
      console.log($name, "component un-mount");
    };
  }, []);

  return (
    <>
      <h1>{JSON.stringify(user)}</h1>
      <h1>{JSON.stringify(post)}</h1>
      <style jsx>{``}</style>
    </>
  );
}
