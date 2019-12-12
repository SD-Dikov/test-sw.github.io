module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/sw-test/'
    : '/'
}
