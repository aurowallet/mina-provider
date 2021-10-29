const path = require("path");
module.exports = (env, argv) => {
  console.log('argv.mode', argv.mode)
  const mode = argv.mode;
  const isDev = mode === 'development';
  const config = {
    entry: './src/index.ts',
    output: {
      filename: 'index.js',
      path: path.resolve(__dirname, 'dist'),
    },
    module: {
      //加载器配置
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
    }
  };
  return config;
}
