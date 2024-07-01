# F1 API test

Used API: [OpenF1](https://openf1.org/)

Find API on [github](https://github.com/br-g/openf1)

Playing arround with the OpenF1 API to get useful information out of it.

How to use:
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

At the moment it is pure HTML & JavaScript - soon to be adapted!

Done:
- Download player information
- simple JavaScript file with simple calls (see [f1-test.js](./f1-test.js))
- starting with express site
- added images of the drivers
- race control messages
	- in reversed order - top = newest
	- added button to turn on/off the blue flag messages
- teamradio messages as audio files
- adapt time format

ideas/toDos:
- live results
- add qualifying/training mode
- add names to teamradio
- teamcolors
- update navbar in each html
- positions of the drivers
- timer to test "real" live
- add css
- map with cars driving
- add testing
- add github actions
- add results of races
