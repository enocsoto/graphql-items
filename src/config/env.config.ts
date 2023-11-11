export const EnvConfiguration =() => ({

    environment: process.env.NODE_ENV ||'dev',
    port: process.env.PORT || 3001,
    defaultLimit: process.env.DEFAULT_LIMIT || 5,
    defaultOffset: process.env.DEFAULT_OFFSET || 0
})