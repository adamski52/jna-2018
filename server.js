require("dotenv").config();

const webpack = require("webpack");
const WebpackDevServer= require("webpack-dev-server");
const config = require("./webpack.config");
const compiler = webpack(config);

var server = new WebpackDevServer(compiler, {
    publicPath: "",
    hot: true,
    inline: true,
    proxy: {
        "/jna": {
            target: "localhost:8081",
            pathRewrite: {
                '^/jna': ''
            },
            changeOrigin: true,
            headers: {
                "User-Agent": "jonathanadamski.com",
                "Content-Type": "application/json"
            }
        },

        "/api": {
            target: {
                protocol: "https:",
                host: "api.github.com"
            },
            pathRewrite: {
                '^/api': ''
            },
            changeOrigin: true,
            secure: false,
            headers: {
                "Authentication": "token " + process.env.GITHUB_TOKEN,
                "User-Agent": "jonathanadamski.com",
                "Content-Type": "application/json"
            }
        }
    }
});

server.listen(8080, "localhost", () => {
    console.log("Running on :8080");
});
