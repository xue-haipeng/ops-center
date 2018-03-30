import { stringify } from 'qs';
import request from '../utils/request';

export async function queryOrder(params) {
  return request(`/api/wxorder?${stringify(params)}`);
}

export async function removeOrder(params) {
  return request('/api/wxorder', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addOrder(params) {
  return request('/api/wxorder', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}
