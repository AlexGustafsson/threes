const debug = require('debug')('threes:app');
const express = require('express');

const {generate} = require('./generator');

const PORT = process.env['PORT'] || 3000;

const app = express();

app.get('/:username.png', async (req, res) => {
  const imageStream = await generate(req.params['username']);
  imageStream.pipe(res);
});

app.listen(PORT);
debug(`Listening on :${PORT}`);
