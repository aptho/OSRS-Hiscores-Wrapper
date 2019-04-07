const axios = require('axios')
const deserializer = require('./ResponseDeserializer')
const mappings = require('./Mappings')

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
      return this.getResponseObject(400, 'Invalid game mode')
    }

    // If an invalid character name is passed
    const nameRegex = /^[0-9A-Za-z-_\s]+$/
    if (!nameRegex.test(name)) {
      return this.getResponseObject(400, 'Invalid character name')
    }

    const url = `${this.baseUrl}m=${mode}/index_lite.ws?player=${name}`
    let statData = {}

    try {
      statData = await this.getData(url)

      // If we ended on /splash, something went wrong
      if (statData.request.res.responseUrl == this.redirectedUrl) {
        return this.getResponseObject(400, 'Bad request')
      }
    } catch (e) {
      // Pass through any failed requests
      return this.getResponseObject(e.response.status, e.response.statusText)
    }

    // Deserialise & add other useful data to the response object
    let response = deserializer.deserialize(statData.data)
    response.name = name
    response.gameMode = mode

    // Assume >200 since axios didn't throw
    return {
      status: 200,
      body: response,
    }
  }

  /**
   * Gets data from the url endpoint
   * @param {string} url
   */
  async getData(url) {
    return await axios.get(url)
  }

  /**
   * Generate a response body
   * @param {int} status
   * @param {string} message
   */
  getResponseObject(status, message) {
    return {
      status: status,
      body: {
        message: message,
      },
    }
  }
}

module.exports = HiscoresApi
