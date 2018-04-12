/**
 * Created by yunxian on 2017/6/2.
 */

export default function () {
  var props = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  return function (state, OwnProps) {
    var result = {};
    Object.keys(props).forEach(function (key) {
      if (typeof props[key] === 'function') {
        result[key] = props[key](state, OwnProps);
      }
    });
    return result;
  };
};