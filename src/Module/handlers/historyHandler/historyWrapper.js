/**
 * Created by yunxian on 2017/6/1.
 */
import React from 'react';
import queryString from 'query-string';
import { historyHandler } from './historyHandler';

export default function historyWrapper($history = {}, component) {
  const { queryChange, pathChange } = $history;
  return function (Target) {
    class HistoryWrapperComponent extends React.Component {
      constructor(props) {
        super(props);
        if (typeof queryChange === 'function') {
          const bindQueryChange = queryChange.bind(this, { ...this.props, ...component.prototype });
          Reflect.set($history, 'queryChange', bindQueryChange);
        }
        if (typeof pathChange === 'function') {
          const bindPathChange = pathChange.bind(this, { ...this.props, ...component.prototype });
          Reflect.set($history, 'pathChange', bindPathChange);
        }
      }
      componentWillReceiveProps(nextProps) {
        if (JSON.stringify(this.props) !== JSON.stringify(nextProps)) {
          if (typeof queryChange === 'function') {
            const bindQueryChange = queryChange.bind(this, { ...nextProps, ...component.prototype });
            Reflect.set($history, 'queryChange', bindQueryChange);
          }
          if (typeof pathChange === 'function') {
            const bindPathChange = pathChange.bind(this, { ...nextProps, ...component.prototype });
            Reflect.set($history, 'pathChange', bindPathChange);
          }
        }
      }
      componentWillMount() {
        const { queryChange, pathChange } = $history;
        const history = this.props.history;
        const { search: initialSearch, pathname: initialPathname } = history.location;
        const initialQuery = queryString.parse(initialSearch);
        if (typeof queryChange === 'function') {
          queryChange(initialQuery);
        }
        if (typeof pathChange === 'function') {
          pathChange(initialPathname);
        }
      }
      componentDidMount() {
        const history = this.props.history;
        historyHandler(history);
      }
      render() {
        return React.createElement(Target, this.props, this.props.children);
      }
    }
    return HistoryWrapperComponent;
  };
};