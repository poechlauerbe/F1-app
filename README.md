# My F1 APP

Used API: [OpenF1](https://openf1.org/)

Find API on [GitHub](https://github.com/br-g/openf1)

Playing arround with the OpenF1 API to get useful information out of it and create my own app.
For now there are these tabs with inforamtion: Drivers, Track info, Training, Race Leaderboard, Race Control & Teamradio.

Next tests possible during the upcoming race weekend starting on Fr 5.7.2024

[Open Points list](OpenPoints.md)

## Prerequisites
1. Node
2. additionally npm to:
- start the server with logfiles:
```bash
npm start
```
- start the server with logfiles and nodemon (restarts server when there is a change of code):
```bash
npm run dev
```

## How to use
1. Clone repository:
```bash
git clone git@github.com:poechlauerbe/F1-app.git
cd F1-app
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

## My journey
1. Starting with a simple curl calls of the API - to see what kind of data I get and how it looks
2. simple JavaScript file with simple calls (see [f1-test.js](./z_old/f1-test.js))
3. created my first node express app (suggested by ChatGPT)
- HTML files in public folder (each navbar was just copy/pasted in each file)
- simple CSS - to get basic navbar
- javascript: calculating everything in the browser and creating the dynamic page elements
- server.js: only catching from the API when request, (request from browser -> fetch from external API -> response to browser - for some calculations more then one request needed)
- change at some point: only one navbar to update - written in JavaScript - no copy paste in the HTML files
4. improvement through EJS (embedded JavaScript)
- created partials: one partial for the navbar, one partial for the whole head tag
5. Moved calculation from browser to server
- server:
  - created startup process
  - created different objects
  - made update automatism
  - error handling when no data is incoming
  - CSS: added colors to different race control messages
6. Added new features, many tests during Silverstone GP & Hungaro GP weekend
- single Lap calculation
- pit stops page

If you have any ideas - make a comment in the [discussions](https://github.com/poechlauerbe/F1-app/discussions) or create an [issue](https://github.com/poechlauerbe/F1-app/issues)

[My actual board of ideas/things I want to add](https://github.com/users/poechlauerbe/projects/4)

[Overview of Release Notes](https://github.com/poechlauerbe/F1-app/releases)

## Nice stuff for formula1 fans - found during research
- [FastF1](https://github.com/theOehrly/Fast-F1)
- [F1 Tracks](https://github.com/bacinger/f1-circuits/tree/master)
- [Postman API](https://documenter.getpostman.com/view/11586746/SztEa7bL#intro)

### Attention
This project is not associated in any way with the Formula 1 companies. F1, FORMULA ONE, FORMULA 1, FIA FORMULA ONE WORLD CHAMPIONSHIP, GRAND PRIX and related marks are trade marks of Formula One Licensing B.V.
