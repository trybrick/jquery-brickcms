const path = require('path');

module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  entry: {
    brickcms: "./src/brickcms.ts",
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: "[name].js", // <--- Will be compiled to this single file
    library: "BrickCms",
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader"
      }
    ]
  }
};
