module.exports = {
  webpack: (config, options) => {
    config.optimization.minimize = true;
    return config;
  },
  i18n: {
    locales: ["ja", "ko"],
    defaultLocale: "ja",
  },
};
