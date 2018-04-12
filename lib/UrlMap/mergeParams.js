var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Created by yunxian on 2017/6/22.
 */
import queryString from 'query-string';

export default function (history, params) {
  var _history$location = history.location,
      pathname = _history$location.pathname,
      search = _history$location.search;

  var query = queryString.parse(search);
  var newQuery = Object.assign(query, params);
  var finalString = '';
  Object.keys(newQuery).forEach(function (key) {
    if (newQuery[key] === 'undefined') delete newQuery[key];
    if (typeof newQuery[key] === 'string' && newQuery[key].length === 0) delete newQuery[key];
  });
  Object.keys(newQuery).forEach(function (key) {
    if (_typeof(newQuery[key]) === 'object') {
      finalString = finalString + '&' + key + '=' + JSON.stringify(newQuery[key]);
    } else {
      finalString = finalString + '&' + key + '=' + newQuery[key];
    }
  });
  finalString = finalString.substr(1);
  console.log(history.location.search);
  console.log(finalString);
  history.push(pathname + '?' + finalString);
}