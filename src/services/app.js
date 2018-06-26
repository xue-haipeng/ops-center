import { stringify } from 'qs';
import * as axios from 'axios';
import request from '../utils/request';

export async function queryHosts(params) {
  const queryParams = {};
  if (params && 'currentPage' in params) {
    queryParams.currentPage = params.currentPage;
  }
  if (params && 'pageSize' in params) {
    queryParams.pageSize = params.pageSize;
  }
  if (params && 'sort' in params) {
    queryParams.sort = params.sort;
  }
  return axios.request(`http://localhost:8002/hosts/list?${stringify(queryParams)}`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function removeHosts(params) {
  return request('http://11.11.47.72:8888/api/v1/app/hosts', {
    method: 'DELETE',
    data: {
      ...params,
    },
  });
}

export async function addHost(params) {
  return axios.request('http://localhost:8002/hosts', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateHost(params) {
  return axios.request('http://localhost:8002/hosts', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}
