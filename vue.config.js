const path = require("path");
const resolve = (dir) => path.join(__dirname, dir);
const ENV = {
  DEVELOPMENT: 1,
  TEST: 1 << 1,
  PRODUCTION: 1 << 2,
};
const getEnvCode = (env = process.env.NODE_ENV) => {
  let envCode = ENV.DEVELOPMENT;
  switch (env) {
    case "development":
      {
        envCode = ENV.DEVELOPMENT;
      }
      break;
    case "test":
      {
        envCode = ENV.TEST;
      }
      break;
    case "production":
      {
        envCode = ENV.PRODUCTION;
      }
      break;
  }
  return envCode;
};

const port = 7101;

module.exports = {
  publicPath: getEnvCode() & ENV.PRODUCTION ? "/" : "/product",
  assetsDir: "assets",
  outputDir: "dist",
  lintOnSave: true,
  devServer: {
    hot: true,
    port: port,
    open: true,
    noInfo: false,
    overlay: {
      warning: true,
      errors: true,
    },
  },
  transpileDependencies: [],
  configureWebpack() {
    return {
      resolve: {
        alias: {
          "@": resolve("src"),
        },
      },
    };
  },
  chainWebpack(config) {
    config.when(getEnvCode & ENV.PRODUCTION, (config) => {
      config.performance.set("hints", false);
      config.devtool("none");
      config.optimization.splitChunks({
        chunks: "all",
        cacheGroups: {
          vendors: {
            name: "chunk-vendors",
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: "initial",
          },
        },
      });
    });
  },
};
