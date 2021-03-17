const isProd = process.env.NODE_ENV === "production";
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

module.exports = (phase, { defaultConfig }) => {
  console.log(`[next.config.js]`, phase);
  console.log(defaultConfig);

  // .env 파일을 dev, prod 분리해서 쓰게 때문에 필요없을듯
  // if (phase === PHASE_DEVELOPMENT_SERVER) {
  //   return {
  //     /* development only config options here */
  //   };
  // }

  const basePath = process.env.NEXT_PUBLIC_BASE_PATH;

  return {
    /* config options for all phases except development here */
    // env: {
    //     customKey: 'my-value',
    //     PUBLIC_URL: basePath
    // },
    // trailingSlash: true,
    basePath: basePath,
    assetPrefix: basePath,
    // publicRuntimeConfig: {
    //     basePath: basePath,
    // }
    sassOptions: {
      // includePaths: ['./src'],
      // prependData: `@import "~@styles/variable.scss";`,
      // prependData: `$basePath: ~src/assets/images;`,
      prependData: `$basePath: '${basePath}';`
    },
    typescript: {
      // !! WARN !!
      // Dangerously allow production builds to successfully complete even if
      // your project has type errors.
      // !! WARN !!
      ignoreBuildErrors: true
    }
  };
};
