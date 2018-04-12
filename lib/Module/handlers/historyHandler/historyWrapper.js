var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Created by yunxian on 2017/6/1.
 */
import React from 'react';
import queryString from 'query-string';
import { historyHandler } from './historyHandler';

export default function historyWrapper() {
  var $history = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var component = arguments[1];
  var queryChange = $history.queryChange,
      pathChange = $history.pathChange;

  return function (Target) {
    var HistoryWrapperComponent = function (_React$Component) {
      _inherits(HistoryWrapperComponent, _React$Component);

      function HistoryWrapperComponent(props) {
        _classCallCheck(this, HistoryWrapperComponent);

        var _this = _possibleConstructorReturn(this, (HistoryWrapperComponent.__proto__ || Object.getPrototypeOf(HistoryWrapperComponent)).call(this, props));

        if (typeof queryChange === 'function') {
          var bindQueryChange = queryChange.bind(_this, _extends({}, _this.props, component.prototype));
          Reflect.set($history, 'queryChange', bindQueryChange);
        }
        if (typeof pathChange === 'function') {
          var bindPathChange = pathChange.bind(_this, _extends({}, _this.props, component.prototype));
          Reflect.set($history, 'pathChange', bindPathChange);
        }
        return _this;
      }

      _createClass(HistoryWrapperComponent, [{
        key: 'componentWillReceiveProps',
        value: function componentWillReceiveProps(nextProps) {
          if (JSON.stringify(this.props) !== JSON.stringify(nextProps)) {
            if (typeof queryChange === 'function') {
              var bindQueryChange = queryChange.bind(this, _extends({}, nextProps, component.prototype));
              Reflect.set($history, 'queryChange', bindQueryChange);
            }
            if (typeof pathChange === 'function') {
              var bindPathChange = pathChange.bind(this, _extends({}, nextProps, component.prototype));
              Reflect.set($history, 'pathChange', bindPathChange);
            }
          }
        }
      }, {
        key: 'componentWillMount',
        value: function componentWillMount() {
          var queryChange = $history.queryChange,
              pathChange = $history.pathChange;

          var history = this.props.history;
          var _history$location = history.location,
              initialSearch = _history$location.search,
              initialPathname = _history$location.pathname;

          var initialQuery = queryString.parse(initialSearch);
          if (typeof queryChange === 'function') {
            queryChange(initialQuery);
          }
          if (typeof pathChange === 'function') {
            pathChange(initialPathname);
          }
        }
      }, {
        key: 'componentDidMount',
        value: function componentDidMount() {
          var history = this.props.history;
          historyHandler(history);
        }
      }, {
        key: 'render',
        value: function render() {
          return React.createElement(Target, this.props, this.props.children);
        }
      }]);

      return HistoryWrapperComponent;
    }(React.Component);

    return HistoryWrapperComponent;
  };
};