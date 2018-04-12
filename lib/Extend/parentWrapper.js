var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by yunxian on 2017/6/1.
 */
import React from 'react';
import PropTypes from 'prop-types';

export default function parentWrapper(Target) {
  var ParentWrapperComponent = function (_React$Component) {
    _inherits(ParentWrapperComponent, _React$Component);

    function ParentWrapperComponent() {
      _classCallCheck(this, ParentWrapperComponent);

      return _possibleConstructorReturn(this, (ParentWrapperComponent.__proto__ || Object.getPrototypeOf(ParentWrapperComponent)).apply(this, arguments));
    }

    _createClass(ParentWrapperComponent, [{
      key: 'render',
      value: function render() {
        Target.childContextTypes = {
          $$Top: PropTypes.object
        };
        Target.prototype.getChildContext = function () {
          return { $$Top: this };
        };
        return React.createElement(Target, this.props, this.props.children);
      }
    }]);

    return ParentWrapperComponent;
  }(React.Component);

  return ParentWrapperComponent;
}