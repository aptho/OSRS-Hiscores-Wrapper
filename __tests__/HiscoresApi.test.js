const HiscoresApi = require('../lib/HiscoresApi')
const HiscoresApiError = require('../lib/HiscoresApiError')

describe('Hiscores API tests', () => {
  it('should throw when passing an invalid username', async () => {
    const api = new HiscoresApi()
    await expect(api.getStats('name!?<>')).rejects.toThrow(HiscoresApiError)
  })

  it('should throw when passing an invalid game mode', async () => {
    const api = new HiscoresApi()
    await expect(api.getStats('name', 'invalid_game_mode')).rejects.toThrow(
      HiscoresApiError
    )
  })
})
