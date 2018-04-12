import queryString from 'query-string';
import Subscriber from './subscriber';

const __subscriber = [];

function addSubscriber(historyListener) {
  __subscriber.push(new Subscriber(historyListener));
}

function notifySubscriber(type, data, oriData) {
  if (type === 'path') {
    __subscriber.forEach(subscriber => subscriber.triggerPathHandler(data));
  }
  if (type === 'query') {
    const result = {};
    Object.keys(data).forEach((key) => {
      if (data[key] !== oriData[key]) {
        result[key] = data[key];
      }
    });
    Object.keys(oriData).forEach((key) => {
      if (typeof data[key] === 'undefined') {
        result[key] = null;
      }
    });
    __subscriber.forEach(subscriber => subscriber.triggerQueryHandler(result));
  }
}
// subscribe the change of the history
const urlProxy = new Proxy({
  query: {}
}, {
  get(target, prop, receiver) {
    return Reflect.get(target, prop, receiver);
  },
  set(target, prop, value, receiver) {
    const originalValue = Reflect.get(target, prop);
    const result = Reflect.set(target, prop, value, receiver);
    notifySubscriber(prop, value, originalValue);
    return result;
  }
});

function historyHandler(history) {
  const { search: initialSearch, pathname: initialPathname } = history.location;
  const initialQuery = queryString.parse(initialSearch);
  urlProxy.path = initialPathname;
  urlProxy.query = initialQuery;
  history.listen((location, action) => {
    const { search, pathname } = location;
    const query = queryString.parse(search);
    if (urlProxy.path !== pathname) {
      urlProxy.path = pathname;
    }
    if (JSON.stringify(urlProxy.query) !== JSON.stringify(query)) {
      urlProxy.query = query;
    }
  });
}

export {
  historyHandler,
  addSubscriber
}