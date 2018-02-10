require("dotenv").config();

const webpack = require("webpack");
const WebpackDevServer= require("webpack-dev-server");
const config = require("./webpack.config");
const compiler = webpack(config);

console.log("WAT", process.env.GITHUB_TOKEN);

var server = new WebpackDevServer(compiler, {
    publicPath: "",
    hot: true,
    inline: true,
    proxy: {
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
