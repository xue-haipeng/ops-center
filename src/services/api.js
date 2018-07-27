import { stringify } from 'qs';
import request from '../utils/request';
import { getCurrentUser } from '../utils/authority';

export async function queryProjectNotice() {
  return request('/api/project/notice');
}

export async function queryActivities() {
  return request('/api/activities');
}

export async function queryRule(params) {
  return request(`/api/rule?${stringify(params)}`);
}

export async function removeRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params) {
  return request('/api/rule', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function fakeSubmitForm(params) {
  return request('/api/forms', {
    method: 'POST',
    data: params,
  });
}

export async function fetchCharts() {
  return request('tivoli/cpu/charts');
}

export async function ascsCpuCurr() {
  return request('tivoli/cpu/sap_curr');
}

export async function nHoursHostsCpuAvg7(n) {
  return request(`tivoli/cpu/${n}_hour_host_cpu_7`);
}

export async function queryHostsDistrType(type) {
  return request(`tivoli/cpu/hostDistr/${type}`);
}

export async function queryTags() {
  return request('/api/tags');
}

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryAdvancedProfile() {
  return request('/api/profile/advanced');
}

export async function queryFakeList(params) {
  return request(`/api/fake_list?${stringify(params)}`);
}

export async function fakeAccountLogin(params) {
  return request('/api/login/account', {
    method: 'POST',
    body: params,
  });
}

export async function fakeRegister(params) {
  return request('/api/register', {
    method: 'POST',
    data: params,
  });
}

export async function queryNotices() {
  return request(`/users/notices/${getCurrentUser()}`);
}

export async function clearNotices(type) {
  return request(`/users/notices/${type}/${getCurrentUser()}`, {
    method: 'DELETE',
  })

}
