const isProd = process.env.NODE_ENV === 'production'
const { PHASE_DEVELOPMENT_SERVER } = require('next/constants')

module.exports = (phase, {defaultConfig}) => {
    console.log(`[next.config.js]`, phase)
    console.log(defaultConfig)

    if (phase === PHASE_DEVELOPMENT_SERVER) {
        return {
            /* development only config options here */
        }
    }

    console.log(process.env)
    
    return {
        /* config options for all phases except development here */
        env: {
            NEXT_PUBLIC_EXP: "next.config.js Web client !!!"
        },
        // trailingSlash: true,
        basePath: '/club', // "/iamges/a.png" 문자열로 된 경로는 적용안된다
        // assetPrefix: '/club',
        // publicRuntimeConfig: {
        //     basePath: "/club",
        // }
    }
}