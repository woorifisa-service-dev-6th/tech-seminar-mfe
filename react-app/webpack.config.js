import webpack from 'webpack';
import path from 'path';
const { ModuleFederationPlugin } = webpack.container;
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  mode: 'development',

  entry: './src/ReactWidget.jsx', // ⭐ 중요 (아래 에러 2 설명)
  
  output: {
    publicPath: 'http://localhost:3002/',
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',   // <style> 주입
          'css-loader',     // CSS 해석
          'postcss-loader', // Tailwind v4 처리
        ],
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },

  plugins: [
    new ModuleFederationPlugin({
      name: 'reactApp',
      filename: 'remoteEntry.js',
      exposes: {
        './ReactWidget': './src/ReactWidget.jsx',
      },
    //   shared: {
    //     react: {
    //       singleton: true,
    //       requiredVersion: false,
    //     },
    //     'react-dom': {
    //       singleton: true,
    //       requiredVersion: false,
    //     },
    //   },
    }),
  ],
};