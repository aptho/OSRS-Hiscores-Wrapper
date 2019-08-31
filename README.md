# OSRS Hiscores wrapper

## Typical usage:
```
const Hiscores = require('osrs-hiscores-wrapper')

Hiscores.getStats('name', 'gamemode').then(res => {
  const attack = res.getLevel('attack')
})
```

## Account object:

### Methods:
- `getLevel(skillname)`
    - Parameters:
        - skillname (required): string
    - Return value: int
- `getCombatLevel(rounded)`
    - Parameters:
        - rounded (optional): bool
    - Return value: int|string