import request from 'superagent';

export const  apiEndpoint = (endpoint, qs, fetchingFrom) =>{
  let query = '';
  let apiUrl = '';

  if (qs) {
    query = `?${qs}`;
  }

  if (fetchingFrom === 'server') {
    // apiUrl = 'https://dfca9b734a9c50e93380739b3354b0f0-unapalabra.localtunnel.me';
    apiUrl = 'http://localhost:8080';
  }

  return `${apiUrl}/${endpoint}${query}`;
};

export const fetchServer = (url, body, from, query) => {
  let endPoint = apiEndpoint(url, query, from);
  return request.post(endPoint)
          .send(body)
          .set('accept', 'json');
};

export const fetchGetServer = (url, body, from, query) => {
  let endPoint = apiEndpoint(url, query, from);
  return request.get(endPoint);
};