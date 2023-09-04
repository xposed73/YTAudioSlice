const ytdl = require('ytdl-core');
const ffmpeg = require('fluent-ffmpeg');
const fs = require('fs');

const videoUrl = 'https://www.youtube.com/watch?v=OEhfzc7JtLQ';
const startTime = '00:00:49';
const duration = '00:00:18';

const video = ytdl(videoUrl, { quality: 'highestaudio' });

ffmpeg()
  .input(video)
  .setStartTime(startTime)
  .setDuration(duration)
  .audioCodec('libmp3lame')
  .toFormat('mp3')
  .on('end', () => {
    console.log('Segment extraction finished.');
  })
  .on('error', (err) => {
    console.error('Error:', err);
  })
  .pipe(fs.createWriteStream('output.mp3'));
