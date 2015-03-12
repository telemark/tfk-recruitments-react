'use strict';

var https = require('https');

function fixReturn(input){
  var showMore = false;
  var openings = [];

  if (input.length > 6 ) {
    showMore = true;
    openings = input.slice(0,6);
  } else {
    openings = input;
  }

  return {
    showMore: showMore,
    openings: openings
  };
}

function getOpenings(options, callback) {
  var body = '';
  var url = options.url;

  https.get(url, function(res) {

    res.on('data', function(chunk) {
      body += chunk.toString();
    });

    res.on('end', function() {
      var json = JSON.parse(body);
      return callback(null, fixReturn(json));
    });

  }).on('error', function(error) {
    return callback(error, null);
  })
}

module.exports = getOpenings;