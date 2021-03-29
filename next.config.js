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
    // trailingSlash: true, // 경로 끝에 "/"
    // reactStrictMode: true,
    // generateEtags: false, // html etag 캐시관련
    // poweredByHeader: false,
    // compress: true, // 리소스 gzip
    basePath: basePath,
    // assetPrefix: basePath, //CDN
    // pageExtensions: ['mdx', 'jsx', 'js', 'ts', 'tsx'],
    // productionBrowserSourceMaps: false, // 소스맵
    sassOptions: {
      // includePaths: [path.join(__dirname, "styles")],
      prependData: `$basePath: '${basePath}';` // sass $basePath 변수 선언
    },
    typescript: {
      ignoreBuildErrors: true // ts 빌드 에러 무시
    },
    exportTrailingSlash: true,
    exportPathMap: async function (
      defaultPathMap,
      { dev, dir, outDir, distDir, buildId }
    ) {
      // 라우트경로 : {페이지경로, 페이지파라미터}  -> html 생성
      return {
        "/": { page: "/" },
        "/css": { page: "/ex/css", query: {} },
        "/home": { page: "/ex/home", query: {} },
        "/image": { page: "/ex/image", query: {} }
      };
    }
  };

  const withBundleAnalyzer = require("@next/bundle-analyzer")({
    enabled: process.env.ANALYZE === "true"
  });
  return withBundleAnalyzer(productionOptions);
};
