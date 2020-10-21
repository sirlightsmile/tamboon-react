const path = require("path");

const config = {
  entry: "./src/index.tsx",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "build"),
    publicPath: "build",
  },

  devtool: "inline-source-map",

  devServer: {
    inline: true,
    host: "0.0.0.0",
    port: 3000,
    historyApiFallback: true,
    disableHostCheck: true,
    contentBase: "public",
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/],
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.ts(x?)$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        exclude: /node_modules/,
        loader: "file-loader",
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};

module.exports = config;
