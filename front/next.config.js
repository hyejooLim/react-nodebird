// webpack settings
// script 명령어를 실행하면 해당 파일이 실행됨

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true', // true 이어야 withBundleAnalyzer가 실행됨
});

module.exports = withBundleAnalyzer({
  compress: true, // gzip으로 압축
  webpack(config, { webpack }) {
    const prod = process.env.NODE_ENV === 'production';
    const plugins = [...config.plugins];
    return {
      ...config,
      mode: prod ? 'production' : 'development',
      devtool: prod ? 'hidden-source-map' : 'eval',
      plugins,
    };
  },
});
