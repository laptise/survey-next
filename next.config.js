module.exports = {
  webpack: (config, options) => {
    config.optimization.minimize = true;
    return config;
  },
};
