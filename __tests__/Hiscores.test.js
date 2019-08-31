const Hiscores = require('../lib/Hiscores')
const HiscoresError = require('../lib/HiscoresError')

describe('Hiscores tests', () => {
  it('should throw when passing an invalid username', async () => {
    const api = new Hiscores()
    await expect(api.getStats('name!?<>')).rejects.toThrow(HiscoresError)
  })

  it('should throw when passing an invalid game mode', async () => {
    const api = new Hiscores()
    await expect(api.getStats('name', 'invalid_game_mode')).rejects.toThrow(
      HiscoresError
    )
  })
})
