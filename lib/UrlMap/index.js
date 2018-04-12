var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

/**
 * Created by yunxian on 2017/6/22.
 */
import mergeParam from './mergeParams';

export default function (handler) {
  return function (Target, key, descriptor) {
    var oriValue = Reflect.get(Target, key);
    var newValue = function newValue() {
      var props = this.props,
          state = this.state;

      var params = handler.apply(undefined, [{ props: props, state: state }].concat(Array.prototype.slice.call(arguments)));
      var history = props.history;
      mergeParam(history, params);
      return oriValue.apply(this, arguments);
    };
    return _extends({}, descriptor, { value: newValue });
  };
};