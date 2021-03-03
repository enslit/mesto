const presets = [
  ['@babel/env', {
    targets: {
      edge: '17',
      ie: '11',
      firefox: '14',
      chrome: '64',
      safari: '11.1',
    },
    useBuiltIns: 'entry'
  }]
]

module.exports = {presets}