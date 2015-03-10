'use strict';

var https = require('https');

function getOpenings(options, callback) {
  var body = '';
  var url = options.url;

  https.get(url, function(res) {

    res.on('data', function(chunk) {
      body += chunk.toString();
    });

    res.on('end', function() {
      var json = JSON.parse(body);
      return callback(null, json);
    });

  }).on('error', function(error) {
    return callback(error, null);
  })
}

module.exports = getOpenings;