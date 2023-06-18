const fs = require('fs');
const player = require('videojs');

const m3uFile = fs.readFileSync('Darshan@TataPlay.m3u');
const playlist = JSON.parse(m3uFile);

const playerInstance = player.create('my-player');

playlist.forEach((item) => {
  playerInstance.src({
    src: item.url,
    type: item.type,
  });
});

playerInstance.play();
