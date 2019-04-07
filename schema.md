## OSRS Hiscores json API Schema

### Stats: `/v1/stats/{username}?mode={mode}`

- name: player name

- mode: game mode (optional)
    - hiscore_oldschool
    - hiscore_oldschool_ironman
    - hiscore_oldschool_ultimate
    - hiscore_oldschool_hardcore_ironman
    - hiscore_oldschool_deadman
    - hiscore_oldschool_seasonal
    - hiscore_oldschool_tournament

Example valid (200) response:
```
{
    "name": name,
    "gameMode": hiscore_oldschool,
    "skills": {
        "total": {
            "level": 2216,
            "experience": 325191901,
            "rank": 944
        },
        "attack": {
            "level": 99,
            "experience": 13034431,
            "toNextLevel": 0,
            "rank": 1
        }...
    },
    "clues": {
        "total": {
            "complete": 397,
            "rank": 7043
        },
        "easy": {
            "complete": 87,
            "rank": 5008
        }...
    }
}
```

Example user not found (404) response:
```
{
  "message": "Not found"
}
```

Example invalid gamemode (400) response:
```
{
  "message": "Invalid game mode"
}
```

Example generic bad request (400) response:
```
{
  "message": "Bad request"
}
```