/**
 * Created by yunxian on 2017/6/1.
 */
import React from 'react';
import shallowEqual from './shallowEqual';
import autobind from './autobind';

export default function OptWrapper(Target) {

  class OptComponent extends React.Component {
    shouldComponentUpdate(nextProps, nextState) {
      return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
    }
    render() {
      return React.createElement(Target, this.props, this.props.children);
    }
  }

  return OptComponent;
}

export {
  autobind
};
