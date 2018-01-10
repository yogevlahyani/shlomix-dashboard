const path = require('path');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
module.exports = {
 entry: {
   app: './src/index.tsx'
 },
 plugins: [
   new CleanWebpackPlugin(['dist']),
   new HtmlWebpackPlugin({
     title: 'Production'
   })
 ],
 resolve: {
     // Add '.ts' and '.tsx' as resolvable extensions.
     extensions: [".ts", ".tsx", ".js", ".json"]
 },

 module: {
     rules: [
         // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
         { test: /\.tsx?$/, loader: "awesome-typescript-loader" },

         // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
         { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },

         { test: /\.css$/, loader: "style-loader!css-loader" },

         { test: /\.mp3$/, loader: 'file-loader' }
     ]
 },
 output: {
   filename: '[name].bundle.js',
   path: path.resolve(__dirname, 'dist')
 }
};
