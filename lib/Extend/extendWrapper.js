var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by yunxian on 2017/6/1.
 */
import React from 'react';
import PropTypes from 'prop-types';
import OptWrapper, { autobind } from '../OptComponent';

export default function extendWrapper(Target) {
  var _class, _temp;

  var ExtendWrapperComponent = (_temp = _class = function (_React$Component) {
    _inherits(ExtendWrapperComponent, _React$Component);

    function ExtendWrapperComponent() {
      _classCallCheck(this, ExtendWrapperComponent);

      return _possibleConstructorReturn(this, (ExtendWrapperComponent.__proto__ || Object.getPrototypeOf(ExtendWrapperComponent)).apply(this, arguments));
    }

    _createClass(ExtendWrapperComponent, [{
      key: 'getChildContext',
      value: function getChildContext() {
        return { $$Top: this.context.$$Top };
      }
    }, {
      key: 'render',
      value: function render() {
        Target.prototype.$$Top = this.context.$$Top;
        var OptComponent = autobind(Target);
        return React.createElement(OptComponent, this.props, this.props.children);
      }
    }]);

    return ExtendWrapperComponent;
  }(React.Component), _class.contextTypes = {
    $$Top: PropTypes.object
  }, _class.childContextTypes = {
    $$Top: PropTypes.object
  }, _temp);

  return OptWrapper(ExtendWrapperComponent);
}