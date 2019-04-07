const Account = require('../lib/Account')
const mocks = require('../__mocks__/mocks')

describe('Account tests', () => {
  it('should deserialize experience & level data', () => {
    const account = new Account(mocks.response)
    Object.keys(account.skills).forEach(skill => {
      expect(account.skills[skill].level).toEqual(expect.any(Number))
      expect(account.skills[skill].experience).toEqual(expect.any(Number))
      expect(account.skills[skill].rank).toEqual(expect.any(Number))
    })
  })

  it('should return 0 remaining experience when skill is level 99', () => {
    const account = new Account(mocks.response)
    const remaining = account.getExperienceToNextLevel(99, 13034431)
    expect(remaining).toBe(0)
  })

  it('should calculate combat level correctly', () => {
    const account = new Account(mocks.response)

    const maxLevel = account.calculateCombat(99, 99, 99, 99, 99, 99, 99)
    expect(maxLevel.level).toBe(126)
    expect(maxLevel.actualLevel).toBe('126.1')

    const minLevel = account.calculateCombat(10, 1, 1, 1, 1, 1, 1)
    expect(minLevel.level).toBe(3)
    expect(minLevel.actualLevel).toBe('3.4')
  })
})
