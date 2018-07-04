import { stringify } from 'qs';
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
  return request(`app/hosts/list?${stringify(queryParams)}`, {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function removeHosts(params) {
  console.log('removeHosts params: ', params.ids);
  return request('app/hosts', {
    method: 'DELETE',
    data: params.ids,
  });
}

export async function addHost(params) {
  return request('app/hosts', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateHost(params) {
  return request('app/hosts', {
    method: 'PUT',
    data: {
      ...params,
    },
  });
}

export async function claimHosts(params) {
  console.log('claimHost: ', params);
  return request('app/hosts/claim', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function queryVmInfo(ipAddress) {
  return request(`vms/${ipAddress}-`);
}
