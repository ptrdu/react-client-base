/**
 * Created by yunxian on 2017/6/1.
 */
import React from 'react';
import { Route } from 'react-router-dom';
import { Router } from 'react-router'
import { createHashHistory } from 'history';

const __routers = [];
const history = createHashHistory();

function addRoutes(path, component, options) {
  const route = React.createElement(Route, { path, component, ...options, key: path })
  __routers.push(route);
}

function createRouter(LayoutComponent) {
  if (typeof LayoutComponent !== 'undefined') {
    const RouteComponent = React.createElement(Route,{
      path: "/",
      render: (props) => React.createElement(LayoutComponent, props, __routers)
    });
    return (
      <Router history={history}>
        {RouteComponent}
      </Router>
    )
  } else {
    return (
      <Router history={history}>
        {__routers}
      </Router>
    )
  }
}


export {
  history,
  addRoutes,
  createRouter,
}



