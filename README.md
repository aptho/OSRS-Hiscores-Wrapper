# OSRS API wrapper

## How to get an account object:
```
const HiscoresApi = require('osrs-hiscores-api')

HiscoresApi.getStats('name', 'gamemode').then(res => {
    // getStats returns a promise
    // which resolves to a new Account() object
})
```

## The account object:

### Methods:
- `getLevel(skillname)`
    - Parameters:
        - skillname (required): string
    - Return value: int
- `getCombatLevel(rounded)`
    - Parameters:
        - rounded (optional): bool
    - Return value: int|string

## Local API:
This repository uses [node express](https://expressjs.com/) to generate an api to fetch OSRS user stats

Endpoint information once running: [schema.md](schema.md)

To run the API locally:
```
yarn
yarn run start
```