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

  it('should calculate combat level correctly', () => {
    const account = new Account(mocks.response)

    const maxLevel = account.calculateCombat(99, 99, 99, 99, 99, 99, 99)
    expect(maxLevel.level).toBe(126)
    expect(maxLevel.actualLevel).toBe(126.1)

    const minLevel = account.calculateCombat(10, 1, 1, 1, 1, 1, 1)
    expect(minLevel.level).toBe(3)
    expect(minLevel.actualLevel).toBe(3.4)
  })

  it('should return the correct level', () => {
    const account = new Account(mocks.response)
    const level = account.getLevel('attack')
    expect(level).toBe(99)
  })

  it('should return the correct combat level', () => {
    const account = new Account(mocks.response)
    
    const combatLevel = account.getCombatLevel()
    expect(combatLevel).toBe(126)

    const combatLevelRounded = account.getCombatLevel(false)
    expect(combatLevelRounded).toBe(126.1)
  })
})
