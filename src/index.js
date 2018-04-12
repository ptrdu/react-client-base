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
import { history, createRouter, addRoutes } from './Routers';
import Extend from './Extend';
import Module from './Module';
import UrlMap from './UrlMap';

const composeEnhancers = composeWithDevTools({
  // Specify here name, actionsBlacklist, actionsCreators and other options if needed
});

class App {
  constructor() {
    this.router = null;
    this.epicPlugins = {};
  }
  addRoutes() {
    addRoutes(...arguments);
  }
  createRouter() {
    this.router = createRouter(...arguments);
  }
  addEpicDependence(name, plugin) {
    this.epicPlugins[name] = plugin;
  }
  start(dom) {
    const router = this.router;
    const reducer = combineReducers(__reducersCollectors);
    const rootEpic = combineEpics(...__epicsCollectors);
    const epicMiddleWare = createEpicMiddleware(rootEpic, {
      dependencies: this.epicPlugins
    });
    const store = createStore(
      reducer,
      composeEnhancers(
        applyMiddleware(epicMiddleWare)
      ));
    const ProviderCom = (
      <Provider store={store}>
        {router}
      </Provider>
    );
    // historyHandler(history);
    ReactDom.render(ProviderCom, dom);
  }
}


export default App;

export {
  Module,
  Extend,
  UrlMap
};
