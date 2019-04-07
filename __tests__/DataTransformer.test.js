const Transformer = require('../lib/DataTransformer')

describe('DataTransformer tests', () => {
  it('should return 0 remaining experience when skill is level 99', () => {
    const remaining = Transformer.getExperienceToNextLevel(99, 13034431)
    expect(remaining).toBe(0)
  })
})