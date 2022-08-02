import axios from 'axios';

const getToken = async () => {
  const token = JSON.parse(localStorage.getItem('user'))?.token;
  let returnedToken = 'No Token';
  if (token) {
    returnedToken = token;
    return 'Bearer ' + returnedToken.replace(/"/g, '');
  }
  return '';
};

export const axiosGet = async (options) => {
  let fullApiPath = `${process.env.REACT_APP_API_URL}${options.endpoint}`;

  let res = axios.get(fullApiPath, {
    params: options.body,
    headers: {
      'Content-Type': 'application/json',
      Authorization: (await getToken()).toString(),
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      timezoneOffset: new Date().getTimezoneOffset(),
    },
  });
  return res;
};

export const axiosPost = async (options) => {
  let fullApiPath = `${process.env.REACT_APP_API_URL}${options.endpoint}`;

  let res = await axios.post(fullApiPath, options.body, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: (await getToken()).toString(),
    },
  });

  return res;
};

export const axiosDelete = async (options) => {
  let fullApiPath = `${process.env.REACT_APP_API_URL}${options.endpoint}`;

  let res = await axios.delete(fullApiPath, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: (await getToken()).toString(),
    },
    data: options.body,
  });

  return res;
};

export const axiosPut = async (options) => {
  let fullApiPath = `${process.env.REACT_APP_API_URL}${options.endpoint}`;

  let res = await axios.put(fullApiPath, options.body, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: (await getToken()).toString(),
    },
  });
  return res;
};
