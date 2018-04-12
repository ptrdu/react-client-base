/**
 * Created by yunxian on 2017/6/22.
 */
import mergeParam from './mergeParams';

export default function (handler) {
  return function (Target, key, descriptor) {
    const oriValue = Reflect.get(Target, key);
    const newValue = function () {
      const { props, state } = this;
      const params = handler({ props, state }, ...arguments);
      const history = props.history;
      mergeParam(history, params);
      return oriValue.apply(this, arguments);
    };
    return { ...descriptor, value: newValue };
  };
};
