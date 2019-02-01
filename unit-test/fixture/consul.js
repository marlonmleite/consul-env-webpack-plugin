const consul = () => ({
  kv: {
    get: (path, callback) => {
      if (path === true) {
        callback('FAIL')
      } else {
        callback(null, { Value: '{ "prop": true }' })
      }
    }
  }
})

export default jest.mock('consul', () => consul)