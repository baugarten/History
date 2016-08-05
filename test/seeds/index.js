if (process.env.NODE_ENV === 'development') {
  return require('./development_seeds');
} else if (process.env.NODE_ENV === 'test') {
  return require('./test_seeds');
}
