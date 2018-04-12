var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Created by yunxian on 2017/6/1.
 */
import React from 'react';
import ReactDom from 'react-dom';
import 'rxjs';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { combineEpics, createEpicMiddleware } from 'redux-observable';
import { Provider } from 'react-redux';
import { __epicsCollectors, __reducersCollectors } from './Module';
import { historyHandler } from './Module/handlers/historyHandler';
import { history, createRouter as _createRouter, addRoutes as _addRoutes } from './Routers';
import Extend from './Extend';
import Module from './Module';
import UrlMap from './UrlMap';

var composeEnhancers = composeWithDevTools({
  // Specify here name, actionsBlacklist, actionsCreators and other options if needed
});

var App = function () {
  function App() {
    _classCallCheck(this, App);

    this.router = null;
    this.epicPlugins = {};
  }

  _createClass(App, [{
    key: 'addRoutes',
    value: function addRoutes() {
      _addRoutes.apply(undefined, arguments);
    }
  }, {
    key: 'createRouter',
    value: function createRouter() {
      this.router = _createRouter.apply(undefined, arguments);
    }
  }, {
    key: 'addEpicDependence',
    value: function addEpicDependence(name, plugin) {
      this.epicPlugins[name] = plugin;
    }
  }, {
    key: 'start',
    value: function start(dom) {
      var router = this.router;
      var reducer = combineReducers(__reducersCollectors);
      var rootEpic = combineEpics.apply(undefined, _toConsumableArray(__epicsCollectors));
      var epicMiddleWare = createEpicMiddleware(rootEpic, {
        dependencies: this.epicPlugins
      });
      var store = createStore(reducer, composeEnhancers(applyMiddleware(epicMiddleWare)));
      var ProviderCom = React.createElement(
        Provider,
        { store: store },
        router
      );
      // historyHandler(history);
      ReactDom.render(ProviderCom, dom);
    }
  }]);

  return App;
}();

export default App;

export { Module, Extend, UrlMap };