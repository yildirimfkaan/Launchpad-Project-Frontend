import * as Service from './Service';

export const doGet = (endpoint, body) => {
  return Service.axiosGet({
    body,
    endpoint,
  });
};

export const doPost = (endpoint, body) => {
  return Service.axiosPost({
    body,
    endpoint,
  });
};

export const doPut = (endpoint, body) => {
  return Service.axiosPut({
    body,
    endpoint,
  });
};

export const doDelete = (endpoint, body) => {
  return Service.axiosDelete({
    body,
    endpoint,
  });
};
