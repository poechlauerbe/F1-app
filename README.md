# F1 API test

Used API: [OpenF1](https://openf1.org/)

Find API on [GitHub](https://github.com/br-g/openf1)

Playing arround with the OpenF1 API to get useful information out of it.
For now there are 4 tabs with inforamtion: Drivers, Leaderboard, Race Control, Teamradio.

Next tests possible during the next race weekend starting on Fr 5.7.2024

## How to use
1. Clone repository:
```bash
git clone git@github.com:poechlauerbe/F1-api.git
cd F1-api
```
2. Start server in shell:
```bash
node ./server.js
```
3. Open in browser:
```Browser
http://localhost:3000/
```
4. If your mobile phone is in the same network as your computer you can access the site from your mobile phone after opening port 3000 on your computer (don't forget to close it afterwards)
```Browser
http://localhost:3000/
```

At the beginning it was pure HTML & JavaScript & simple CSS.
Already adapted a little - with EJS.
Working in progress...

## Done
- Get information from API
- simple JavaScript file with simple calls (see [f1-test.js](./f1-test.js))
- starting with express app
- added CSS
- only one navbar to update - written in JavaScript
- changed to EJS

### Driver
- added photos of the drivers

### Race control messages
- in reversed order - top = newest
- added button to turn on/off the blue flag messages
- adapted time format

### TeamRadio Messages
- reversed order - top = newest
- available audio
- adapted time format
- add names to teamradio

### Race Leaderboard
- get correct positions
- added driver information and photo
- add time infos in leaderboard

## To be tested
- live results in race leaderboard

## next steps / ongoing
- check automated updates
  - which intervals would be good?
- add GitHub Actions
- define requirements for app - what has to be installed (add on to "how to use")

## open points / ideas
- adapt "how to use"
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

### Race control - open
- add CSS depending on the message

### Teamradio - open
- add photo (maybe only for bigger devices)
- think about update strategy to not reload everything all the time

Buglist:
- linter - change config-file for JavaScript - change tabs/spaces
