class HiscoresApiError extends Error {
  constructor(status, ...params) {
    super(...params)
    this.status = status
  }
}

module.exports = HiscoresApiError
