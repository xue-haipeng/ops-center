import { stringify } from 'qs';
import FileSaver from 'file-saver'
import request from '../utils/request';
import { getCurrentUser } from '../utils/authority';

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

export async function exportHosts(params) {
  return request('app/hosts/excel', {
    headers: {
      'Accept': 'application/octet-stream',
    },
    method: 'POST',
    responseType:'blob',
    data: {
      ...params,
    },
  }).then(response => {
    FileSaver.saveAs(response, '主机列表.xlsx');
  });
}

export async function removeHosts(params) {
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
      ...params, reviser: getCurrentUser(),
    },
  });
}

export async function claimHosts(params) {
  return request('app/hosts/claim', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function queryVmInfo(params) {
  return request(`vms/${params.ip}-${params.hostname}`);
}
