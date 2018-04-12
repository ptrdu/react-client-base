import queryString from 'query-string';
import Subscriber from './subscriber';

var __subscriber = [];

function addSubscriber(historyListener) {
  __subscriber.push(new Subscriber(historyListener));
}

function notifySubscriber(type, data, oriData) {
  if (type === 'path') {
    __subscriber.forEach(function (subscriber) {
      return subscriber.triggerPathHandler(data);
    });
  }
  if (type === 'query') {
    var result = {};
    Object.keys(data).forEach(function (key) {
      if (data[key] !== oriData[key]) {
        result[key] = data[key];
      }
    });
    Object.keys(oriData).forEach(function (key) {
      if (typeof data[key] === 'undefined') {
        result[key] = null;
      }
    });
    __subscriber.forEach(function (subscriber) {
      return subscriber.triggerQueryHandler(result);
    });
  }
}
// subscribe the change of the history
var urlProxy = new Proxy({
  query: {}
}, {
  get: function get(target, prop, receiver) {
    return Reflect.get(target, prop, receiver);
  },
  set: function set(target, prop, value, receiver) {
    var originalValue = Reflect.get(target, prop);
    var result = Reflect.set(target, prop, value, receiver);
    notifySubscriber(prop, value, originalValue);
    return result;
  }
});

function historyHandler(history) {
  var _history$location = history.location,
      initialSearch = _history$location.search,
      initialPathname = _history$location.pathname;

  var initialQuery = queryString.parse(initialSearch);
  urlProxy.path = initialPathname;
  urlProxy.query = initialQuery;
  history.listen(function (location, action) {
    var search = location.search,
        pathname = location.pathname;

    var query = queryString.parse(search);
    if (urlProxy.path !== pathname) {
      urlProxy.path = pathname;
    }
    if (JSON.stringify(urlProxy.query) !== JSON.stringify(query)) {
      urlProxy.query = query;
    }
  });
}

export { historyHandler, addSubscriber };