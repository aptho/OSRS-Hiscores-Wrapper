const deserializer = require('../lib/ResponseDeserializer')
const mocks = require('../__mocks__/mocks')

describe('Deserialization tests', () => {
  it('should construct a valid response', () => {
    const data = deserializer.deserialize(mocks.rawResonse)
    expect(data).toEqual(
      expect.objectContaining({
        skills: expect.any(Object),
        clues: expect.any(Object),
      })
    )
  })

  it('should set experience values to type int', () => {
    const data = deserializer.deserialize(mocks.rawResonse)
    Object.keys(data.skills).forEach(e => {
      expect(data.skills[e].experience).toEqual(expect.any(Number))
    })
  })

  it('should return 0 remaining experience when level 99', () => {
    const remainingExperience = deserializer.getExperienceToNextLevel(
      99,
      13034431
    )
    expect(remainingExperience).toBe(0)
  })
})
