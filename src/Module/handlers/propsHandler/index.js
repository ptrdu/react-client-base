/**
 * Created by yunxian on 2017/6/2.
 */

export default function (props = {}) {
  return function (state, OwnProps) {
    const result = {};
    Object.keys(props).forEach((key) => {
      if (typeof props[key] === 'function') {
        result[key] = props[key](state, OwnProps);
      }
    });
    return result;
  };
};