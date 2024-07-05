# Open Points

## To be tested
- live results in race leaderboard

## next steps / ongoing
- training/qualifying mode
- check automated updates
  - which intervals would be good?
- add GitHub Actions
- define requirements for app - what has to be installed (add on to "how to use")

## open points / ideas
- add Pit Tab
- when new session - delete some of the data in driver, weather, laps, etc.
- think about CSS grid of the different pages
- idea layout change to tables
- add qualifying/training mode
  - get info what session is through session mode
- add point table (maybe change drivers in to general leaderboard)
- timer to test "real" live
- map with cars driving
- add testing
- add results of old races
- add countdown to next race
- errorhandling with EJS
- single driver spectator
- run server in docker

### Data management / API management - open
- how to store data from the api?
- how to update data?
- which database?
- how to get sessions keys?
- how to set up to get data?
- how to connect data?
- change update process to not calculate everything in the browser
- change update process to only process updated values and not recalculate everything (faster)

### Drivers - open
- add teamcolors
- add statistics
- check for change - later when there is some server running permanently
- update: only at start
- identifier: year + number

### Race leaderboard - open
- add current lap
- add tyre

### Teamradio - open
- add photo (maybe only for bigger devices)
- think about update strategy to not reload everything all the time

### Raceinfo
- change time/date value of start & end time
- what does rainfall mean - which values?
- what does wind direction mean?
- info: 1 update per minute

## Buglist
- linter - change config-file for JavaScript - change tabs/spaces
- local time is always server time
- during training sessions wrong messages in leaderboard (seconds behind leader)


## Technical questions
- how to automatically add versions
- change package.json verson automatically
- how to combine tyres with laps


## Fixed Bugs
- you have to go first on drivers and then on race leaderbaord to get the race leaderboard shown. (drivers are not loaded)