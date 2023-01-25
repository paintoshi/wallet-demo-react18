const path = require("path");
const fs = require("fs");
 
const rewireBabelLoader = require("react-app-rewire-babel-loader");
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

// https://stackoverflow.com/a/71280203/3560398

module.exports = function override(config) {
  config = rewireBabelLoader.include(
    config,
    resolveApp("node_modules/wagmi"),
    resolveApp("node_modules/@web3modal"),
    resolveApp("node_modules/@wagmi"),
    resolveApp("node_modules/@walletconnect")
  );

  return config
}
