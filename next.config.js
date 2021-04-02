const {
  PHASE_EXPORT,
  PHASE_PRODUCTION_BUILD,
  PHASE_PRODUCTION_SERVER,
  PHASE_DEVELOPMENT_SERVER
} = require("next/constants");

const path = require("path");

/*
https://nextjs.org/docs/api-reference/next.config.js/introduction
https://nextjs.org/docs/api-reference/next.config.js/custom-webpack-config
*/
module.exports = (phase, { defaultConfig }) => {
  console.log(phase);
  console.log(defaultConfig);

  const isProd = process.env.NODE_ENV === "production";
  const basePath = process.env.NEXT_PUBLIC_BASE_PATH;
  const distDir = phase === PHASE_DEVELOPMENT_SERVER ? ".next" : "build";

  const productionOptions = {
    // onDemandEntries: {
    //     maxInactiveAge: 25 * 1000,
    //     pagesBufferLength: 2,
    // },
    // env: {
    //     customKey: 'my-value'
    // },
    // serverRuntimeConfig: {
    //     mySecret: 'secret',
    //     secondSecret: process.env.SECOND_SECRET,
    // },
    // publicRuntimeConfig: {
    //     staticFolder: '/static',
    // },
    // async rewrites() {
    //     return [
    //       {
    //         source: '/about',
    //         destination: '/',
    //       },
    //     ]
    // },
    // async redirects() {
    //     return [
    //       {
    //         source: '/about',
    //         destination: '/',
    //         permanent: true,
    //       },
    //     ]
    // },
    // async headers() {
    //     return [
    //       {
    //         source: '/about',
    //         headers: [
    //           {
    //             key: 'x-custom-header',
    //             value: 'my custom header value',
    //           },
    //           {
    //             key: 'x-another-custom-header',
    //             value: 'my other custom header value',
    //           },
    //         ],
    //       },
    //     ]
    // },
    images: {
      loader: "imgix"
      // path: "/",
    },
    distDir: distDir, // [next dev =a> /.next] [next build, export, server => /build]
    generateBuildId: async () => {
      return "my-build-id";
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
      // Note: we provide webpack above so you should not `require` it
      // Perform customizations to webpack config
      config.plugins.push(new webpack.IgnorePlugin(/\/__tests__\//));

      // Important: return the modified config
      return config;
    },
    // reactStrictMode: true,
    // generateEtags: false, // html etag 캐시관련
    // poweredByHeader: false,
    // compress: true, // 리소스 gzip
    basePath: basePath,
    assetPrefix: "./", // 빌드된 css, js 등 어셋 경로
    // pageExtensions: ['mdx', 'jsx', 'js', 'ts', 'tsx'],
    // productionBrowserSourceMaps: false, // 소스맵
    sassOptions: {
      // includePaths: [path.join(__dirname, "styles")],
      prependData: `$basePath: '${basePath}';` // sass $basePath 변수 선언
    },
    typescript: {
      ignoreBuildErrors: true // ts 빌드 에러 무시
    },
    /**
     필수옵션
     /out/ex/home.html -> /out/ex/home/index.html
     http://localhost/home.html -> http://localhost/home/ 으로 요청가능해진다.
     */
    trailingSlash: true // 필수 /out/ex/home.html -> /out/ex/home/index.html
    // exportTrailingSlash: true, // The "exportTrailingSlash" option has been renamed to "trailingSlash". Please update your next.config.js.
    /**
    맵핑한것만 html로 외부에 노출된다. location.reload()
    index.html만 필요한 경우 같이 특수한 상황이 아니면 사용할 필요없다.
    dynamic route는 안된다. /out/ex/[id]/home/index.html
    */
    // exportPathMap: async function (
    //   defaultPathMap,
    //   { dev, dir, outDir, distDir, buildId }
    // ) {
    //   // 라우트경로: {페이지경로, 페이지파라미터}  -> html 생성
    //   // http://localhost/css -> /src/page/ex/css
    //   return {
    //     "/": { page: "/" },
    //     "/ex/css": { page: "/ex/css", query: {} },
    //     "/ex/home": { page: "/ex/home", query: {} },
    //     "/ex/image": { page: "/ex/image", query: {} }
    //   };
    // }
  };

  const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true"
  });
  return withBundleAnalyzer(productionOptions);
};
