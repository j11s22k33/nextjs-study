import React, { useEffect } from "react";
import useSWR, { mutate } from "swr";
import axios from "axios";
import Link from "next/link";

const pageName = "[MyUseSWR]";
const SWR_KEY = "/api/hello";

// https://swr.vercel.app/
function useSWR_hello() {
  // 서버에서 받은 데이터 가공하기
  const addData = (data) => {
    return { ...data, addr: "경기도" };
  };

  // 데이터 fetch 정의
  const fetcher_fetch = (url) =>
    fetch(url)
      .then((res) => res.json())
      .then(addData);

  // 데이터 fetch 정의
  const fetcher_axios = (url) =>
    axios
      .get(url)
      .then((res) => res.data)
      .then(addData);

  // 데이터 fetch 정의
  const fetcher_custom = (url) => {
    return addData({ name: "Hue" });
  };

  // useSWR Hook
  const { data, error } = useSWR(SWR_KEY, fetcher_custom);

  // 로컬 캐시 즉시 업데이트. 재검증 요청안함. SWR 몰래 업데이트. mutate(KEY)
  // mutate(SWR_KEY, { ...data, imgUrl: "http://naver.com/404.png" }, false); // 여기서 또 데이터 가공

  // 동일한 KEY를 사용하는 모든 SWR에게 재검증 요청. mutate(KEY)
  // mutate(SWR_KEY);

  // 동일한 KEY를 사용하는 모든 SWR에게 재검증 요청. mutate(KEY)
  // mutate(SWR_KEY, async (newData) => {
  //   return { ...newData, date: "2021-03-27 19:58:00" }; // 여기서 또 데이터 가공
  // });

  console.log("[useSWR_hello] =>", data, error);

  return {
    data,
    isLoading: !error && !data,
    isError: error
  };
}

// component
function Hello({ age }) {
  const hello = useSWR_hello();

  if (hello.isLoading) {
    return <div>로딩중</div>;
  }
  if (hello.isError) {
    return <div>에러</div>;
  }

  return (
    <div>
      name:{hello.data.name}
      <br />
      age:{age}
    </div>
  );
}

export default function MyUseSWR({ updateUI }) {
  useEffect(() => {
    console.log(pageName, "component mount");

    return () => {
      console.log(pageName, "component un-mount");
    };
  }, []);

  return (
    <>
      <Hello age="40"></Hello>
      <Link href={mutate(SWR_KEY)}>
        <h1 className="link">클릭하면 mutate({SWR_KEY})</h1>
      </Link>
      <style jsx>{`
        .link {
          background-color: yellow;
        }
        .link:hover {
          cursor: pointer;
          text-decoration: underline;
        }
      `}</style>
    </>
  );
}
