/**
 * Created by yunxian on 2017/6/1.
 */
import React from 'react';
import PropTypes from 'prop-types';
import OptWrapper, { autobind } from '../OptComponent';

export default function extendWrapper(Target) {
  class ExtendWrapperComponent extends React.Component {
    static contextTypes = {
      $$Top: PropTypes.object
    };
    static childContextTypes = {
      $$Top: PropTypes.object
    };
    getChildContext() {
      return { $$Top: this.context.$$Top };
    }
    render() {
      Target.prototype.$$Top = this.context.$$Top;
      const OptComponent = autobind(Target);
      return React.createElement(OptComponent, this.props, this.props.children);
    }
  }
  return OptWrapper(ExtendWrapperComponent);
}