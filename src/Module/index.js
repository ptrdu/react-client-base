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
const __epicsCollectors = [];
// the list collects reducers
const __reducersCollectors = {};


/**
 * Module注解
 * @param module
 * @return {wrapperComponent}
 * @constructor
 */
export default function MoudleFactory(name) {
  return function Moudle(module) {
    return function wrapperComponent(Target) {
      const { epic, reducers, initialState, actionCreators, history, props } = module;

      if (typeof reducers !== 'undefined') {
        const initial = initialState || {};
        __reducersCollectors[name || Target.name] =
          reducerHandler(reducers, Immutable.fromJS(initial));
      }

      if (typeof epic !== 'undefined') {
        Object.keys(epic).forEach(key => __epicsCollectors.push(epic[key]));
      }

      if (typeof history !== 'undefined') {
        addSubscriber(history);
      }

      // the props is a function
      const mapStateToProps = propsHandler(props);
      // connect the action creator to the component's props
      const mapDispatchToProps = dispatch => bindActionCreators({ ...actionCreators }, dispatch);

      // auto bind the function in the Target component
      const BindComponent = autobind(Target);

      const ParentWrapperComponent = parentWrapper(BindComponent);
      //
      const HistoryBindComponent =
        historyWrapper(history, ParentWrapperComponent)(ParentWrapperComponent);

      const OptComponent = OptWrapper(HistoryBindComponent);

      return connect(mapStateToProps, mapDispatchToProps)(OptComponent);
    };
  }
}


export {
  __epicsCollectors,
  __reducersCollectors,
}