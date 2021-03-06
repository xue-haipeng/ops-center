import { stringify } from 'qs';
import request from '../utils/request';
import { getCurrentUser } from '../utils/authority';

export async function queryTasks(params) {
  const { currentPage: page, pageSize: size, participant, type, word } = params || {};
  const queryParams = { page, size, participant, type, word };
  if (!participant) {
    delete queryParams.participant;
  }
/*  if (params && 'currentPage' in params) {
    queryParams.page = params.currentPage;
  }
  if (params && 'pageSize' in params) {
    queryParams.size = params.pageSize;
  } */
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

export async function queryTaskById(param) {
  return request(`team/tasks/${param.id}`);
}

export async function queryCountByMe(param) {
  return request(`team/tasks/${param.realName}`);
}

export async function queryCountNotFinished() {
  return request('team/tasks/count-not-finished');
}

export async function queryVacations(params) {
  return request(`team/vacation?${stringify(params)}`);
}

export async function addVacation(params) {
  return request('team/vacation', {
    method: 'POST',
    data: {
      ...params,
    },
  });
}
