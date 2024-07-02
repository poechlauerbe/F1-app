# F1 API test

Used API: [OpenF1](https://openf1.org/)

Find API on [github](https://github.com/br-g/openf1)

Playing arround with the OpenF1 API to get useful information out of it.
For now there are 4 tabs (Drivers, Leaderboard, Race Control, Teamradio).

Next tests possible during the next race weekend starting on Fr 5.7.2024

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
4. If your smartphone is in the same network as your computer you can access the site from your smartphone after opening port 3000 on your computer (don't forget to close it afterwards)
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
- reversed order - top = newest
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

## open points/ideas:
- adapt "how to use"
- think about CSS grid of the different pages
- change update process to not calculate everything in the browser
- change update process to only process updated values and not recalculate everything (faster)
- add qualifying/training mode
	- get info what session is through session mode
- add point table (maybe change drivers in to general leaderboard)
- timer to test "real" live
- map with cars driving
- add testing
- add github actions
- add results of old races
- add countdown to next race
### Drivers
- add teamcolors
### Race control messages
- add CSS depending on the message
### Teamradio
- add photo
