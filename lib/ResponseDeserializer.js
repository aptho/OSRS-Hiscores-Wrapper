const mappings = require('./Mappings')

/**
 * Deserialize the string data to an object
 * @param {string} data
 */
function deserialize(data) {
  data = data.split('\n').map(el => el.split(','))

  // Get skills object
  const skillsArray = data.slice(0, 24)
  const skills = getSkillsObject(skillsArray)

  // Get clues object
  const cluesArray = data.slice(26, 32)
  const clues = getCluesObject(cluesArray)

  return {
    skills: skills,
    clues: clues,
  }
}

/**
 * Get the clues object from array data
 * @param {array} data
 */
function getCluesObject(data) {
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
function getSkillsObject(data) {
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
      toNextLevel: getExperienceToNextLevel(el[1], el[2]),
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
function getExperienceToNextLevel(level, experience) {
  if (level >= 99) return 0
  const nextLevel = parseInt(level) + 1
  return parseInt(mappings.xpTable[nextLevel]) - parseInt(experience)
}

module.exports.deserialize = deserialize
module.exports.getExperienceToNextLevel = getExperienceToNextLevel
