var express = require('express');
var request = require('request');
var bodyParser = require('body-parser');

var username = 'forkdummy';

module.exports = function appctor(cfg) {
  var token = cfg.github.token;
  var app = express();

  app.use(bodyParser.urlencoded({extended:false}));

  app.get('/',function(req,res){
    res.render('index.jade');
  });

  app.post('/',function(req,res,next) {
    if (!req.body.name) {
      return next('no name');
    }
    request({
      url: 'https://api.github.com/user/repos',
      method: 'POST',
      auth: {bearer: token},
      headers: {
        'User-Agent': 'forkdummy/0.1.0'
      },
      body: {
        name: req.body.name,
        auto_init: true,
        has_issues: false,
        has_wiki: false,
        has_downloads: false
      }, json: true,
    }, function (err,rRes,body) {
      if (err) return next(err);
      if (rRes.statusCode != 201) {
        if (body.errors) {
          if (body.errors.code == 'custom' && body.errors.field == 'name')
            res.redirect('/err/name?name='+encodeURIComponent(req.body.name));
          else return next(body.errors);
        } else {
          console.error(new Date().toISOString(),body);
          return next('got status '+rRes.statusCode+' from GitHub');
        }
      }
      res.redirect(body.html_url + '/fork');
    });
  });

  app.get('/err/name', function(req, res) {
    res.render('dup.jade',{
      user: username,
      repo: req.query.name.replace(/[^a-zA-Z0-9_\-]+/g,'-')});
  });

  app.use(function(err, req, res, next) {
    res.render('error.jade', {error: err});
  });

  return app;
};
