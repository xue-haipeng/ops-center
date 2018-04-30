import axios from 'axios';
import request from '../utils/request';

export async function query() {
  return request('/api/users');
}

export async function queryCurrent() {
  return request('http://localhost:8888/api/v1/demo/currentUser', {
    method: 'POST',
    headers: {
      Authorization:
        'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1MjUxMDU0ODcsInVzZXJfbmFtZSI6Inh1ZSIsImF1dGhvcml0aWVzIjpbIlJPTEVfVVNFUiJdLCJqdGkiOiI3Y2ZmZGJjMS02N2Q2LTQ0N2ItYjRjYi01NTRiN2RiOTFkOTUiLCJjbGllbnRfaWQiOiJ1YWEtc2VydmljZSIsInNjb3BlIjpbInNlcnZpY2UiXX0.YPdIUaPJrbqN-9EwgX9zrdfGe4T-h6sW4afpoMwD0BL4QV7x49StYi9ofKelMhBz3BS7aEJrxcDed3oNZ9W7adZl6frXjHiCZTmdOPuOxvE_dPaY2w2RTO8ytF-5s_4Fnkc9-Cl0-wD641tDQ28W1CKt-GY4MgbDfkaDFJN6W41LIqE0hWBXhCWb1erP8tHL_Utjm4FVUTtj63Tx-BeooJbbBRlyHWIVGvp2A9sXeCvBKYaMyE7AUvTkzpXxxaJOLre-ODUyTbRuY2zAKvt4rRIXbasL9ZYyra7c8tAVePKbDknk3c29w3buKyJK22V9025gG9NhkpPz8SEY6L07kQ',
    },
  });
}

export async function signIn() {
  return axios.request(
    'http://localhost:8888/api/v1/uaa/oauth/token?username=xue&password=123456&type=account&grant_type=password',
    {
      method: 'POST',
      headers: {
        Authorization: 'Basic dWFhLXNlcnZpY2U6MTIzNDU2',
      },
    }
  );
}

export async function topFunds() {
  return request('http://localhost:8888/api/v1/fund/top-daily-fund');
}
