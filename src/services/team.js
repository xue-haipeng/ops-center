import { stringify } from 'qs';
import request from '../utils/request';
import { getCurrentUser } from '../utils/authority';

export async function queryTasks(params) {
  const queryParams = {};
  if (params && 'currentPage' in params) {
    queryParams.page = params.currentPage;
  }
  if (params && 'pageSize' in params) {
    queryParams.size = params.pageSize;
  }
  return request(`team/tasks?${stringify(queryParams)}`);
}

export async function removeTask(param) {
  return request(`team/tasks/${param.id}`, {
    method: 'DELETE',
  });
}

export async function addTask(params) {
  return request('team/tasks', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}

export async function updateTask(params) {
  return request('team/tasks', {
    method: 'POST',
    data: {
      ...params, reviser: getCurrentUser(),
    },
  });
}

export async function queryTaskById(id) {
  return request(`team/tasks/${id}`);
}
