#! /usr/bin/env node

var cfg = {
  port: process.env.PORT,
  ip: process.env.IP,
  github: {token: process.env.GITHUB_TOKEN}
};

require('http')
  .createServer(require('./index.js')(cfg))
  .listen(cfg.port || 3000, cfg.ip);
