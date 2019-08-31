const Transformer = require('./DataTransformer')

class Account {
  constructor(data) {
    data = Transformer.toArray(data)
    this.skills = Transformer.getSkillsObject(data.slice(0, 24))
    this.minigames = Transformer.getCluesObject(data.slice(26, 32))
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

  /**
   * Return the level of a given skill
   * @param {string} skill 
   */
  getLevel(skill) {
    return this.skills[skill].level
  }

  /**
   * Return rounded or unrounded combat level
   * @param {bool} rounded 
   */
  getCombatLevel(rounded = true) {
    return rounded ? this.combat.level : this.combat.actualLevel
  }

  /**
   * Calculate combat level from combat stats
   * @param {string} hitpoints 
   * @param {string} attack 
   * @param {string} strength 
   * @param {string} defence 
   * @param {string} ranged 
   * @param {string} magic 
   * @param {string} prayer 
   */
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
      actualLevel: parseFloat(combat),
    }
  }
}

module.exports = Account
