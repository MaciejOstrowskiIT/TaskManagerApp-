import axios from 'axios';

const getRequest = async <T>(url: string, port: string = '4051') =>
  axios.get<T>(`http://127.0.0.1:${port}/${url}`, {
    headers: { Authorization: sessionStorage.getItem('token') },
  });

const postRequest = async <T>(url: string, data: any, port: string = '4051') =>
  axios.post<T>(`http://127.0.0.1:${port}/${url}`, data, {
    headers: {
      Authorization: sessionStorage.getItem('token') || '',
      'Content-Type': 'application/json',
    },
  });

const putRequest = async <T>(url: string, data: any, port: string = '4051') =>
  axios.put<T>(`http://127.0.0.1:${port}/${url}`, data, {
    headers: {
      Authorization: sessionStorage.getItem('token') || '',
      'Content-Type': 'application/json',
    },
  });
const patchRequest = async <T>(url: string, data: any, port: string = '4051') =>
  axios.patch<T>(`http://127.0.0.1:${port}/${url}`, data, {
    headers: {
      Authorization: sessionStorage.getItem('token') || '',
      'Content-Type': 'application/json',
    },
  });

export const useAuthorizedRequest = () => {
  return { getRequest, putRequest, postRequest, patchRequest };
};
