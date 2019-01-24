const postcssPresetEnv = require('postcss-preset-env')

module.exports = {
  syntax: 'postcss-scss',
  plugins: [
    postcssPresetEnv( {
      stage: 3,
      features: {
        'nesting-rules': true
      },
      browsers: ['last 2 versions', '> 5%'],
    } ),
    require('cssnano')( {
        preset: 'default',
    } )
  ]
}
