const mappings = require('./Mappings')

/**
 * Convert the response string to an array
 * @param {string} data 
 */
function toArray(data) {
  return data.split('\n').map(el => el.split(','))
}

/**
* Get the skills object from array data
* @param {array} data
*/
function getSkillsObject(data) {
  const skills = {
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
    skills[name] = {
      level: parseInt(el[1]),
      experience: parseInt(el[2]),
      toNextLevel: getExperienceToNextLevel(el[1], el[2]),
      rank: parseInt(el[0]),
    }
  })
  
  return skills
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
* Get the experice until next level
* @param {string} level
* @param {string} experience
*/
function getExperienceToNextLevel(level, experience) {
  if (level >= 99) return 0
  const nextLevel = parseInt(level) + 1
  return parseInt(mappings.xpTable[nextLevel]) - parseInt(experience)
}

module.exports.toArray = toArray
module.exports.getSkillsObject = getSkillsObject
module.exports.getCluesObject = getCluesObject
module.exports.getExperienceToNextLevel = getExperienceToNextLevel