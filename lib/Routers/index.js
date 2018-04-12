var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * Created by yunxian on 2017/6/1.
 */
import React from 'react';
import { Route } from 'react-router-dom';
import { Router } from 'react-router';
import { createHashHistory } from 'history';

var __routers = [];
var history = createHashHistory();

function addRoutes(path, component, options) {
  var route = React.createElement(Route, _extends({ path: path, component: component }, options, { key: path }));
  __routers.push(route);
}

function createRouter(LayoutComponent) {
  if (typeof LayoutComponent !== 'undefined') {
    var RouteComponent = React.createElement(Route, {
      path: "/",
      render: function render(props) {
        return React.createElement(LayoutComponent, props, __routers);
      }
    });
    return React.createElement(
      Router,
      { history: history },
      RouteComponent
    );
  } else {
    return React.createElement(
      Router,
      { history: history },
      __routers
    );
  }
}

export { history, addRoutes, createRouter };