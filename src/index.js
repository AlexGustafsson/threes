const stream = require('stream');

const debug = require('debug')('threes:app');
const express = require('express');

const {generate} = require('./generator');

const PORT = process.env['PORT'] || 3000;

const app = express();

app.get('/suite/:username', (req, res) => {
  res.contentType('text/html');
  const {username} = req.params;
  res.send(`
    <html>
    <head>
      <style>
        body {display: flex; flex-direction: row;}
        div {margin: 15px;}
        img {border: 2px solid rgba(0, 0, 0, 0.2);}
      </style>
    </head>
    <body>
      <div>
        <h1>PNG for '${username}'</h1>
        <img src="/${username}.png" width="150" height="150" />
      </div>
      <div>
        <h1>JPEG for '${username}'</h1>
        <img src="/${username}.jpg" width="150" height="150" />
      </div>
      <div>
        <h1>SVG for '${username}'</h1>
        <img src="/${username}.svg" width="150" height="150" />
      </div>
    </body>
    </html>
  `);
});

app.get('/:username.png', async (req, res) => {
  const canvas = await generate(req.params['username']);
  canvas.createPNGStream().pipe(res);
});

app.get('/:username.jpg', async (req, res) => {
  const canvas = await generate(req.params['username']);
  canvas.createJPEGStream().pipe(res);
});

app.get('/:username.svg', async (req, res) => {
  const canvas = await generate(req.params['username'], {format: 'svg'});

  const readStream = new stream.PassThrough();
  readStream.end(canvas.toBuffer());

  res.contentType('image/svg+xml');
  readStream.pipe(res);
});

app.listen(PORT);
debug(`Listening on :${PORT}`);
