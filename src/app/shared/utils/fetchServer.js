import axios from 'axios';
import queryString from 'query-string';

export function apiEndpoint(endpoint, qs, fetchingFrom) {
  let query = '';
  let apiUrl = '';

  if (qs) {
    query = `?${qs}`;
  }

  if (fetchingFrom === 'server') {
    apiUrl = 'http://localhost:8080';
  }

  return `${apiUrl}/api/${endpoint}${query}`;
}

export function apiOptions(options = {}) {
  const {
    method = 'GET',
    headers = {
      'Content-Type': 'application/json'
    },
    body = false
  } = options;

  const newOptions = {
    method,
    headers,
    credentials: 'include'
  };

  if (body) {
    newOptions.body = body;
  }

  return newOptions;
}


export function axiosFetch (endPoint, options = {}, query = false) {
  let qs;
  const { fetchingFrom = 'client' } = options;
  delete options.fetchFrom;

  if (query) {
    qs = query;
  }

  const fetchOptions = apiOptions(options);
  const fetchEndpoint = apiEndpoint(endpoint, qs, fetchingFrom);

  return axios(fetchEndpoint, fetchOptions).then(response => response.json());
}

class fetchServer {
  static saveData(body) {
    return axiosFetch ('sendSms', {
      method: 'POST',
      body : JSON.stringify(body)
    })
  }

}

export default fetchServer;