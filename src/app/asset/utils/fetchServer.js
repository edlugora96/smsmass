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

export const fetchServer = async (url, body, from, query) => {
  let endPoint = apiEndpoint(url, query, from);
  const res = await request.post(endPoint)
          .send(body)
          .set({
            Accept       : 'application/json',
            Authorization: localStorage.getItem('auth')
          })
          .then((data) => {
            return data;
          })
          .catch((data) => {
            return data;
          });
  return res;
};

export const fetchGetServer = async (url, body, from, query) => {
  let endPoint = apiEndpoint(url, query, from);
  let res = await request.get(endPoint)
                .set({
                  Authorization: localStorage.getItem('auth')
                })
                .then((data) => {
                  return data;
                })
                .catch((data) => {
                  return data;
                });
  return res;
};