import fetch from 'dva/fetch';
import QueryString from 'qs';
import utils from './index';

function parseJSON(response) {
  return response.json();
}

function checkStatus(response) {
  if (response.status >= 200 && response.status < 300) {
    return response;
  }

  const error = new Error(response.statusText);
  error.response = response;
  throw error;
}

/**
 * Requests a URL, returning a promise.
 *
 * @param  {string} url       The URL we want to request
 * @param  {object} [options] The options we want to pass to "fetch"
 * @return {object}           An object containing either "data" or "err"
 */
export default (url = '', options = {}) => {
  if (!url) {
    throw new Error('网络请求故障');
  }
  url = utils.config.baseURL + url;
  options = {
    credentials: 'include',
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    ...options,
  };

  if (typeof options.body !== 'undefined') {
    if (options.headers['Content-Type'].indexOf('json') !== -1) {
      options.body = JSON.stringify(options.body);
    } else {
      options.body = QueryString.stringify(options.body);
    }
  }

  return fetch(url, options)
    .then(checkStatus)
    .then(parseJSON)
    .then(data => ({ data }))
    .catch(err => ({ err }));
};
