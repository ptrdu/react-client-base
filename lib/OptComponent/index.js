var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by yunxian on 2017/6/1.
 */
import React from 'react';
import shallowEqual from './shallowEqual';
import autobind from './autobind';

export default function OptWrapper(Target) {
  var OptComponent = function (_React$Component) {
    _inherits(OptComponent, _React$Component);

    function OptComponent() {
      _classCallCheck(this, OptComponent);

      return _possibleConstructorReturn(this, (OptComponent.__proto__ || Object.getPrototypeOf(OptComponent)).apply(this, arguments));
    }

    _createClass(OptComponent, [{
      key: 'shouldComponentUpdate',
      value: function shouldComponentUpdate(nextProps, nextState) {
        return !shallowEqual(this.props, nextProps) || !shallowEqual(this.state, nextState);
      }
    }, {
      key: 'render',
      value: function render() {
        return React.createElement(Target, this.props, this.props.children);
      }
    }]);

    return OptComponent;
  }(React.Component);

  return OptComponent;
}

export { autobind };