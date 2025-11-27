module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current'
        },
        modules: 'commonjs' // Transformar ES6 modules a CommonJS
      }
    ]
  ]
};
