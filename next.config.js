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
        // env: {
        //     EXP: '.env.local에 등록한 NEXT_PUBLIC_ 와 같음. 클라이언트에서 접근가능'
        // },
        // trailingSlash: true,
        basePath: '/club',
        // assetPrefix: '/club',
        // publicRuntimeConfig: {
        //     basePath: "/club",
        // }
    }
}