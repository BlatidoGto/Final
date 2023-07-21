const { createProxyMiddleware } = require('http-proxy-middleware')
const { env } = require('process')

const context = [
    "/weatherforecast",
    "/api/Efinal"
]

const onError = (err, req, resp, target) => {
    console.error(`${err.message}`);
}

module.exports = function (app) {
    const appProxy = createProxyMiddleware(context, {
        target: target,

        onError: onError,
        secure: false,

        headers: {
            Connection: `Keep-Alive`
        }
    });

    app.use(appProxy);
}