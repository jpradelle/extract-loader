"use strict";

module.exports = (env, { mode }) => {
    const pathToMainCss = require.resolve("./app/main.css");
    const loaders = [{
        loader: "css-loader",
        options: {
            esModule: false,
            sourceMap: true
        }
    }];

    if (mode === "production") {
        loaders.unshift(
            {
                loader: "file-loader",
                options: {
                    name: '[name].[ext]',
                }
            },
            // should be just "extract-loader" in your case
            require.resolve("../../lib/extractLoader.js"),
        );
    } else {
        loaders.unshift("style-loader");
    }

    return {
        mode,
        entry: pathToMainCss,
        module: {
            rules: [
                {
                    test: pathToMainCss,
                    use: loaders
                },
            ]
        }
    };
};
