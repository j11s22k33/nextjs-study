import { useEffect } from "react";
import axios from "axios";
import { cacheAdapterEnhancer, retryAdapterEnhancer } from "axios-extensions";
import MockAdapter from "axios-mock-adapter";
import env from "@/config/env";

const $name = "[MyAxios]";
const $axiosName = "[axios]";

export default function MyAxios() {
  useEffect(() => {
    console.log($name, "component mount");

    const adapterExtensions = retryAdapterEnhancer(axios.defaults.adapter, {
      times: 3
    });
    // const adapterExtensions = cacheAdapterEnhancer(axios.defaults.adapter, {
    //   enabledByDefault: false
    // });

    const API = axios.create({
      // baseURL: env.apiAdmin,
      timeout: 5 * 1000,
      headers: {
        Accept: "application/json",
        "Cache-Control": "no-cache"
      },
      adapter: adapterExtensions
    });

    API.interceptors.request.use(
      (config) => {
        config.params = {
          ...config.params
          // subscribeId: "66216970"
        };
        console.log($axiosName, config);
        return config;
      },
      (error) => {
        // console.log($axiosName, error.message, error.config);
        return Promise.reject(error);
      }
    );

    API.interceptors.response.use(
      (response) => {
        console.log($axiosName, response.config, response.data);
        return response;
      },
      (error) => {
        // console.log($axiosName, error);
        if (error.config) {
          //
        } else if (error.config && error.response) {
          //
        } else {
          //
        }
        return Promise.reject(error);
      }
    );

    // https://www.npmjs.com/package/axios-mock-adapter
    const mock = new MockAdapter(API, { delayResponse: 500 });

    // mock 설정 순서가 중요하다 passThrough 를 여기서 설정하면
    // 그 아래 mock.onGet 설정해봤자 소용없다

    // mock.onAny().passThrough(); // 나머지 URL은 mock 사용안함

    mock.onGet("/hello").replyOnce(500); // status 500 발생
    mock.onGet("/hello").timeoutOnce(); // 타임아웃 한번만
    mock.onGet("/hello").networkErrorOnce(); // 네트워크 에러 한번만
    mock.onGet(new RegExp("/hello")).reply((config) => {
      return [200, { mock: true }];
    });
    mock.onPost("/hello").passThrough(); // post 일때 mock 사용안함
    // mock.onGet("/hello").passThrough(); // get 일때 mock 사용안함

    mock.onAny().passThrough(); // 나머지 URL은 mock 사용안함

    // passThrough 맨 위에 설정하는게 더 편한듯.
    // mock 아답터 제거 후 이전 아답터로 설정.
    // mock.restore(); // 아답터 복원
    // axios.defaults.adapter = adapterExtensions; // 이전 아답터로 설정

    API.get("/hello", {
      baseURL: env.apiAdmin,
      params: { id: 0 }
    })
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
      });
    API.get("/hello", {
      baseURL: env.apiAdmin,
      params: { id: 0 }
    })
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
      });
    API.get("/hello", {
      baseURL: env.apiAdmin,
      params: { id: 0 }
    })
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
      });
    API.get("/hello", {
      baseURL: env.apiAdmin,
      params: { id: 0 }
    })
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
      });
    API.get("/hello", {
      baseURL: env.apiAdmin,
      params: { id: 0 }
    })
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
      });

    return () => {
      console.log($name, "component un-mount");
    };
  }, []);

  return (
    <>
      <div></div>
      <style jsx>{``}</style>
    </>
  );
}
