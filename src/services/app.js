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
  console.log('removeHosts params: ', params);
  return axios.request('http://localhost:8002/hosts', {
    method: 'DELETE',
    data: params.ids,
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

export async function claimHosts(params) {
  return axios.request('http://localhost:8002/hosts/claim', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function queryVmInfo(ipAddress) {
  return axios.request(`http://localhost:8003/vms/${ipAddress}`);
}
