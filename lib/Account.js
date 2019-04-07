const mappings = require('./Mappings')

class Account {
  constructor(data) {
    data = data.split('\n').map(el => el.split(','))
    this.skills = this.getSkillsObject(data.slice(0, 24))
    this.clues = this.getCluesObject(data.slice(26, 32))
    this.combat = this.calculateCombat(
      this.skills.hitpoints.level,
      this.skills.attack.level,
      this.skills.strength.level,
      this.skills.defence.level,
      this.skills.ranged.level,
      this.skills.magic.level,
      this.skills.prayer.level
    )
  }

  calculateCombat(
    hitpoints = 10,
    attack = 1,
    strength = 1,
    defence = 1,
    ranged = 1,
    magic = 1,
    prayer = 1
  ) {
    const base = 0.25 * (defence + hitpoints + Math.floor(prayer / 2))
    const melee = 0.325 * (attack + strength)
    const range = 0.325 * (Math.floor(ranged / 2) + ranged)
    const mage = 0.325 * (Math.floor(magic / 2) + magic)
    const combat = (base + Math.max(melee, range, mage)).toFixed(1)

    return {
      level: Math.floor(combat),
      actualLevel: combat,
    }
  }

  /**
   * Get the clues object from array data
   * @param {array} data
   */
  getCluesObject(data) {
    const clues = {}

    data.map((el, idx) => {
      let name = mappings.clues[idx]
      clues[name] = {
        complete: parseInt(el[1]),
        rank: parseInt(el[0]),
      }
    })

    return clues
  }

  /**
   * Get the skills object from array data
   * @param {array} data
   */
  getSkillsObject(data) {
    const stats = {
      total: {
        level: parseInt(data[0][1]),
        experience: parseInt(data[0][2]),
        rank: parseInt(data[0][0]),
      },
    }

    // Remove total level before looping (we can't calc remaining xp on total level)
    data.shift()

    data.map((el, idx) => {
      let name = mappings.skills[idx]
      stats[name] = {
        level: parseInt(el[1]),
        experience: parseInt(el[2]),
        toNextLevel: this.getExperienceToNextLevel(el[1], el[2]),
        rank: parseInt(el[0]),
      }
    })

    return stats
  }

  /**
   * Get the experice until next level
   * @param {string} level
   * @param {string} experience
   */
  getExperienceToNextLevel(level, experience) {
    if (level >= 99) return 0
    const nextLevel = parseInt(level) + 1
    return parseInt(mappings.xpTable[nextLevel]) - parseInt(experience)
  }
}

module.exports = Account
