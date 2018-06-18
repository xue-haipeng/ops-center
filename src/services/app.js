import { stringify } from 'qs';
import request from '../utils/request';

export async function queryHosts(params) {
  return request(`/api/app/hosts?${stringify(params)}`);
}

export async function removeHosts(params) {
  return request('/api/app/hosts', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addHosts(params) {
  return request('/api/app/hosts', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}
