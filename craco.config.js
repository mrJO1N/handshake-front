const CracoAlias = require("craco-alias");
const sassLoader = require("craco-sass-resources-loader");
const path = require("path");

module.exports = {
  plugins: [
    {
      plugin: CracoAlias,
      options: {
        source: "tsconfig",
        baseUrl: ".",
        tsConfigPath: "./tsconfig.path.json",
      },
    },
    {
      plugin: sassLoader,
      options: {
        resources: "./src/constants/style-constants.sass",
      },
    },
  ],

  devServer: (devServerConfig, { env, paths, proxy, allowedHost }) => {
    return devServerConfig;
  },

  webpack: {
    alias: {
      "@comp": path.resolve(__dirname, "src/components/"),
      "@const": path.resolve(__dirname, "src/constants/"),
    },
    configure: {
      ignoreWarnings: [
        function ignoreSourcemapsloaderWarnings(warning) {
          return (
            warning.module &&
            warning.module.resource.includes("node_modules") &&
            warning.details &&
            warning.details.includes("source-map-loader")
          );
        },
      ],
    },
  },

  jest: {
    configure: {
      moduleNameMapper: {
        "^@comp(.*)$": "<rootDir>/src/components$1",
        "^@const(.*)$": "<rootDir>/src/constants$1",
      },
    },
  },
};
