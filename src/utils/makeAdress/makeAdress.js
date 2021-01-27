import queryString from 'query-string';

export const parseAddresse = (props) => {
  const { location } = props;
  if (location !== undefined) {
    return queryString.parse(location.search);
  }
  return undefined;
};

export const makeQueriesPath = (path, queriesObj) => {
  const str = queryString.stringify(queriesObj);
  if (str !== '') {
    return `${path}?${str}`;
  }
  return path;
};

export const getPathName = (props) => (props.location !== undefined
  ? props.location.pathname
  : undefined);
