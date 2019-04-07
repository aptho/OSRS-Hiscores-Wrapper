const axios = require('axios')
const Account = require('./Account')
const mappings = require('./Mappings')
const HiscoresApiError = require('./HiscoresApiError')

class HiscoresApi {
  constructor() {
    this.baseUrl = 'https://secure.runescape.com/'
    this.redirectedUrl = 'https://www.runescape.com/splash'
  }

  /**
   * Get player stats
   * @param {string} name
   * @param {string} mode
   */
  async getStats(name, mode = 'hiscore_oldschool') {
    // If an invalid game mode is passed via query
    if (!mappings.gameModes.includes(mode)) {
      throw new HiscoresApiError(400, 'Invalid game mode')
    }

    // If an invalid character name is passed
    const nameRegex = /^[0-9A-Za-z-_\s]+$/
    if (!nameRegex.test(name)) {
      throw new HiscoresApiError(400, 'Invalid character name')
    }

    const url = `${this.baseUrl}m=${mode}/index_lite.ws?player=${name}`
    let statData = {}

    try {
      statData = await this.getData(url)

      // If we ended on /splash, something went wrong
      if (statData.request.res.responseUrl == this.redirectedUrl) {
        throw new HiscoresApiError(400, 'Bad request')
      }
    } catch (e) {
      // Pass through any failed requests
      throw new HiscoresApiError(e.response.status, e.response.statusText)
    }

    // Deserialise & add other useful data to the response object
    const account = new Account(statData.data)
    account.name = name
    account.gameMode = mode

    return account
  }

  /**
   * Gets data from the url endpoint
   * @param {string} url
   */
  async getData(url) {
    return await axios.get(url)
  }
}

module.exports = HiscoresApi
