class HiscoresError extends Error {
  constructor(status, ...params) {
    super(...params)
    this.status = status
  }
}

module.exports = HiscoresError
