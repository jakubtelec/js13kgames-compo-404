const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const isProduction = process.env.npm_lifecycle_event === "build";

const plugins = [
  new HtmlWebpackPlugin({
    favicon: "src/favicon.png",
    template: "src/index.html",
    minify: isProduction && {
      collapseWhitespace: true,
    },
    inlineSource: isProduction && ".(js|css)$",
  }),
  new MiniCssExtractPlugin({
    filename: "[name].css",
  }),
].filter(Boolean);

module.exports = {
  entry: "./src",
  devtool: !isProduction && "source-map",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
          },
        ],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        use: ["file-loader"],
      },
    ],
  },
  plugins
};
