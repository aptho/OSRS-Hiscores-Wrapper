# OSRS API wrapper

## How to use
```
const HiscoresApi = require('osrs-hiscores-api')

HiscoresApi.getStats('name', 'gamemode').then(res => {
    // getStats returns a promise
    // so we either need .then
    // or to use an async function
})
```

## Local API:
This repository uses [node express](https://expressjs.com/) to generate an api to fetch OSRS user stats

Endpoint information once running: [schema.md](schema.md)

To run the API locally:
```
yarn
yarn run start
```