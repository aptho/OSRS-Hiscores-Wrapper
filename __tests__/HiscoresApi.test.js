const HiscoresApi = require('../lib/HiscoresApi')

describe('Hiscores API tests', () => {
  it('should return a 400 error when passing an invalid username', () => {
    const api = new HiscoresApi()
    return api.getStats('name!?<>').then(res => {
      expect(res).toEqual(
        expect.objectContaining({
          status: 400,
        })
      )
    })
  })

  it('should return a 400 error when passing an invalid game mode', () => {
    const api = new HiscoresApi()
    return api.getStats('name', 'invalid_game_mode').then(res => {
      expect(res).toEqual(
        expect.objectContaining({
          status: 400,
        })
      )
    })
  })

  it('should return a valid object when constructing a response object', () => {
    const status = 400
    const message = 'Bad request'
    const api = new HiscoresApi()
    const response = api.getResponseObject(status, message)

    expect(response).toEqual(
      expect.objectContaining({
        status: status,
        body: {
          message: message,
        },
      })
    )
  })
})
