import axios from "axios";
import { cacheAdapterEnhancer, retryAdapterEnhancer } from "axios-extensions";
import MockAdapter from "axios-mock-adapter";
import env from "@/config/env";

const axiosName = "[axios]";

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
    console.log(axiosName, config);
    return config;
  },
  (error) => {
    // console.log(axiosName, error.message, error.config);
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  (response) => {
    console.log(axiosName, "<response>", response.config, response.data);
    return response;
  },
  (error) => {
    // console.log(axiosName, "<response>", error);
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
export default API;

// https://www.npmjs.com/package/axios-mock-adapter
if (true && !env.isSTB) {
  const mock = new MockAdapter(API, { delayResponse: 500 });

  mock.onGet(new RegExp("/hello")).replyOnce((config) => {
    return [200, { name: "홍길동" }];
  });
  mock.onGet(new RegExp("/hello")).replyOnce((config) => {
    return [200, { name: "김치한사발" }];
  });
  mock.onGet(new RegExp("/hello")).reply((config) => {
    return [200, { name: "막걸리" }];
  });
  mock.onAny().passThrough();
}
