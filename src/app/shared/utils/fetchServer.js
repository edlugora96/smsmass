import request from 'superagent';

export function apiEndpoint(endpoint, qs, fetchingFrom) {
  let query = '';
  let apiUrl = '';

  if (qs) {
    query = `?${qs}`;
  }

  if (fetchingFrom === 'server') {
    apiUrl = 'https://jkasduhawdawdgsefe.localtunnel.me';
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