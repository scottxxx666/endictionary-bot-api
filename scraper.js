const http = require('http');
var Xray = require('x-ray');

const trimFilt = function trimFilter (value) {
  const stringArr = value.split("\n");
  return stringArr.map(string => string.trim()).join('');
}

const splitLine = function splitLine (value) {
  const stringArr = value.split("\n");
  return stringArr.map(string => string.trim()).filter(value => value);
}

const getSuggestion = function getSuggestion (suggestions) {
  return suggestions.slice(0, 3).map(suggest => {
    return {
      type: "postback",
      title: suggest,
      payload: suggest
    }
  });
}

var x = Xray({
  filters: {
    trimFilt: function (value) {
      return typeof value === 'string' ? trimFilt(value) : value;
    },
    splitLine : function (value) {
      return typeof value === 'string' ? splitLine(value) : value;
    }
  }
});

var scraper = function (query, callback) {
    const url = "http://www.iciba.com/" + query;
    return x(url, {
      keyword: '.keyword | trimFilt',
      kk: '.base-speak | trimFilt',
      chinese: '.switch_part | trimFilt',
      keyword2: '.in-base-top h1 | trimFilt',
      tranlate: '.in-base-top div | trimFilt',
      suggestion: '.sug-words | splitLine'
    });
}

module.exports = {
    scraper: scraper
}