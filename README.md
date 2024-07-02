# F1 API test

Used API: [OpenF1](https://openf1.org/)

Find API on [github](https://github.com/br-g/openf1)

Playing arround with the OpenF1 API to get useful information out of it.
For now there are 4 tabs.
Next tests possible during

## How to use
1. Clone repository:
```
git clone git@github.com:poechlauerbe/F1-api.git
cd F1-api
```
2. Start server in shell:
```
node ./server.js
```
3. Open in browser:
```
http://localhost:3000/index.html
```

At the moment it is pure HTML & JavaScript & simple CSS - soon to be adapted!

## Done:
- Get information from API
- simple JavaScript file with simple calls (see [f1-test.js](./f1-test.js))
- starting with express app
- added css
### Driver
- added images of the drivers
### Race control messages
- in reversed order - top = newest
- added button to turn on/off the blue flag messages
- adapt time format
### TeamRadio Messages
- reversed order -top = newest
- available audio
### Race Leaderboard
- get correct positions
- added driver information and photo

## To be tested:
- live results in race leaderboard

## next steps
- add names to teamradio
- add time infos in leaderboard
- define requirements for app (add on to "how to use")
- check automated updates
	- which intervals would be good?

## open points:
- change update process to not calculate everything in the browser
- change update process to only process updated values and not recalculate everything (faster)
- add qualifying/training mode
	- through session mode
- add teamcolors
- update navbar in each html
- timer to test "real" live
- map with cars driving
- add testing
- add github actions
- add results of old races
- add countdown to next race
- how to use at home
