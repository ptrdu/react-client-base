/**
 * Created by yunxian on 2017/6/22.
 */
import queryString from 'query-string';

export default function (history, params) {
  const { pathname, search } = history.location;
  const query = queryString.parse(search);
  const newQuery = Object.assign(query, params);
  let finalString = '';
  Object.keys(newQuery).forEach((key) => {
    if (newQuery[key] === 'undefined') delete newQuery[key];
    if (typeof newQuery[key] === 'string' && newQuery[key].length === 0) delete newQuery[key];
  });
  Object.keys(newQuery).forEach(key => {
    if (typeof newQuery[key] === 'object') {
      finalString = `${finalString}&${key}=${JSON.stringify(newQuery[key])}`;
    } else {
      finalString = `${finalString}&${key}=${newQuery[key]}`;
    }
  });
  finalString = finalString.substr(1);
  console.log(history.location.search);
  console.log(finalString);
   history.push(`${pathname}?${finalString}`);
}