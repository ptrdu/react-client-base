var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * Created by yunxian on 2017/6/1.
 */
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import React from 'react';
import Immutable from 'immutable';

import OptWrapper, { autobind } from '../OptComponent';
import { parentWrapper } from '../Extend';

import { historyWrapper, addSubscriber } from './handlers/historyHandler';
import reducerHandler from './handlers/ReducerHandler';
import propsHandler from './handlers/propsHandler';

// the list collects redux-observable epics
var __epicsCollectors = [];
// the list collects reducers
var __reducersCollectors = {};

/**
 * Module注解
 * @param module
 * @return {wrapperComponent}
 * @constructor
 */
export default function MoudleFactory(name) {
  return function Moudle(module) {
    return function wrapperComponent(Target) {
      var epic = module.epic,
          reducers = module.reducers,
          initialState = module.initialState,
          actionCreators = module.actionCreators,
          history = module.history,
          props = module.props;


      if (typeof reducers !== 'undefined') {
        var initial = initialState || {};
        __reducersCollectors[name || Target.name] = reducerHandler(reducers, Immutable.fromJS(initial));
      }

      if (typeof epic !== 'undefined') {
        Object.keys(epic).forEach(function (key) {
          return __epicsCollectors.push(epic[key]);
        });
      }

      if (typeof history !== 'undefined') {
        addSubscriber(history);
      }

      // the props is a function
      var mapStateToProps = propsHandler(props);
      // connect the action creator to the component's props
      var mapDispatchToProps = function mapDispatchToProps(dispatch) {
        return bindActionCreators(_extends({}, actionCreators), dispatch);
      };

      // auto bind the function in the Target component
      var BindComponent = autobind(Target);

      var ParentWrapperComponent = parentWrapper(BindComponent);
      //
      var HistoryBindComponent = historyWrapper(history, ParentWrapperComponent)(ParentWrapperComponent);

      var OptComponent = OptWrapper(HistoryBindComponent);

      return connect(mapStateToProps, mapDispatchToProps)(OptComponent);
    };
  };
}

export { __epicsCollectors, __reducersCollectors };