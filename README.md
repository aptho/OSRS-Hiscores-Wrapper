# OSRS Hiscores wrapper

## Typical usage:
```
const Hiscores = require('osrs-hiscores-wrapper')

Hiscores.getStats('name', 'gamemode').then(res => {
  const attack = res.getLevel('attack')
})
```

### Gamemode values:
- hiscore_oldschool
- hiscore_oldschool_ironman
- hiscore_oldschool_ultimate
- hiscore_oldschool_hardcore_ironman
- hiscore_oldschool_deadman
- hiscore_oldschool_seasonal
- hiscore_oldschool_tournament

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