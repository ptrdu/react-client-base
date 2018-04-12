/**
 * Created by yunxian on 2017/6/1.
 */
import React from 'react';
import PropTypes from 'prop-types';

export default function parentWrapper(Target) {
  class ParentWrapperComponent extends React.Component {
    render() {
      Target.childContextTypes = {
        $$Top: PropTypes.object
      };
      Target.prototype.getChildContext = function() {
        return { $$Top: this };
      };
      return React.createElement(Target, this.props, this.props.children);
    }
  }
  return ParentWrapperComponent;
}