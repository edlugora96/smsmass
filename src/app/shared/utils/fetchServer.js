import request from 'superagent';

export function apiEndpoint(endpoint, qs, fetchingFrom) {
  let query = '';
  let apiUrl = '';

  if (qs) {
    query = `?${qs}`;
  }

  if (fetchingFrom === 'server') {
    apiUrl = 'https://dfca9b734a9c50e93380739b3354b0f0-unapalabra.localtunnel.me';
  }

  return `${apiUrl}/api/${endpoint}${query}`;
}

class fetchServer {
  static sendSms(body, from, query) {
    let endPoint = apiEndpoint('sendSms', query, from)
    return request.post(endPoint)
           .send(body)
           .set('accept', 'json');
  }

}

export default fetchServer;