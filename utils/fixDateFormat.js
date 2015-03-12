'use strict';

function fixDateFormat(date) {
  var newDate = date.split('-');
  newDate.reverse();

  return newDate.join('.');
}

module.exports = fixDateFormat;