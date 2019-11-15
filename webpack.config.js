const path = require('path');

module.exports = [
  {
    mode: 'development',
    entry: './src/passwordmeter.js',
    output: {
      filename: 'passwordmeter.js',
      path: path.resolve( __dirname, 'dist' )
    }
  },
  {
    mode: 'production',
    entry: './src/passwordmeter.js',
    output: {
      filename: 'passwordmeter.min.js',
      path: path.resolve( __dirname, 'dist' )
    }
  }
];
  
