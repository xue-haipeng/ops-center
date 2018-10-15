import request from '../utils/request';

export async function hostsByMaintainer(params) {
  return params && params.maintainer
    ? request(`app/hosts/maintainer/${params.maintainer}`) : [];
}

export async function verifyHostPasswd(params) {
  return request('app/hosts/verifyHostPasswd', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateHostPasswd(params) {
  return request('app/hosts/updateHostPasswd', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}
