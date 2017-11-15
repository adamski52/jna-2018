module.exports = function (config) {
    config.set({
        basePath: "",
        frameworks: [
            "jasmine",
            "karma-typescript"
        ],
        files: [
            {pattern: "src/**/*.ts", watched: false}
        ],
        preprocessors: {
            "src/**/*.ts": ["karma-typescript"]
        },
        plugins: [
            "karma-jasmine",
            "karma-chrome-launcher",
            "karma-spec-reporter",
            "karma-typescript"
        ],
        karmaTypescriptConfig: {
            tsconfig: "./tsconfig.json",
            bundlerOptions: {
                transforms: [
                    require("karma-typescript-es6-transform")()
                ]
            }
        },
        reporters: [
            "spec",
            "karma-typescript"
        ],
        logLevel: config.LOG_INFO,
        browsers: [
            "ChromeHeadless"
        ],
        phantomjsLauncher: {
            exitOnResourceError: true
        },
        autoWatch: false,
        singleRun: true,
        concurrency: Infinity
    });
};
