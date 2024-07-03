# F1 API test

Used API: [OpenF1](https://openf1.org/)

Find API on [GitHub](https://github.com/br-g/openf1)

Playing arround with the OpenF1 API to get useful information out of it.
For now there are 4 tabs with inforamtion: Drivers, Leaderboard, Race Control, Teamradio.

Next tests possible during the next race weekend starting on Fr 5.7.2024

[Open Points list](OpenPoints.md)

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
- simple JavaScript file with simple calls (see [f1-test.js](./z_old/f1-test.js))
- starting with express app
- added CSS
- only one navbar to update - written in JavaScript
- switched to EJS approach - now one navbar in HTML

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

## Nice stuff for formula1 fans
- [FastF1](https://github.com/theOehrly/Fast-F1)

### Attention
This project and this website are unofficial and are not associated in any way with the Formula 1 companies. F1, FORMULA ONE, FORMULA 1, FIA FORMULA ONE WORLD CHAMPIONSHIP, GRAND PRIX and related marks are trade marks of Formula One Licensing B.V.
