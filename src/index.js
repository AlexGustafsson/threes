const stream = require('stream');

const debug = require('debug')('threes:app');
const express = require('express');

const generators = require('./generators');
const {generate} = require('./generator');
const demo = require('./demo');

const PORT = process.env['PORT'] || 3000;
// Cache images for a month
const CACHE_TIME = 60 * 60 * 24 * 30;

const app = express();

if (process.env.NODE_ENV && process.env.NODE_ENV === 'production') {
  app.use((req, res, next) => {
    res.removeHeader('X-Powered-By');
    res.set('Cache-Control', `public, max-age=${CACHE_TIME}`);
    next();
  });
}

app.get('/suite/:username', (req, res) => {
  res.contentType('text/html');
  const {username} = req.params;
  let body = '';
  for (const generator of Object.keys(generators))
    body += demo.generatorTemplate.replace(/\{\{generator\}\}/g, generator).replace(/\{\{username\}\}/g, username);
  res.send(demo.source.replace(/\{\{body\}\}/g, body));
});

app.get('/avatar/:style/:username.png', async (req, res) => {
  const canvas = await generate(req.params['username'], {style: req.params['style']});
  canvas.createPNGStream().pipe(res);
});

app.get('/avatar/:style/:username.jpg', async (req, res) => {
  const canvas = await generate(req.params['username'], {style: req.params['style']});
  canvas.createJPEGStream().pipe(res);
});

app.get('/avatar/:style/:username.svg', async (req, res) => {
  const canvas = await generate(req.params['username'], {style: req.params['style'], format: 'svg'});

  const readStream = new stream.PassThrough();
  readStream.end(canvas.toBuffer());

  res.contentType('image/svg+xml');
  readStream.pipe(res);
});

app.listen(PORT);
debug(`Listening on :${PORT}`);
