import request from '@/utils/request';
import type { TableListParams, TableListItem } from './data.d';

export async function queryRule(params?: TableListParams) {
  return request('/api/member', {
    params,
  });
}

export async function removeRule(params: { key: number[] }) {
  return request('/api/member', {
    method: 'POST',
    data: {
      ...params,
      method: 'delete',
    },
  });
}

export async function addRule(params: TableListItem) {
  return request('/api/member', {
    method: 'POST',
    data: {
      ...params,
      method: 'post',
    },
  });
}

export async function updateRule(params: TableListParams) {
  return request('/api/member', {
    method: 'POST',
    data: {
      ...params,
      method: 'update',
    },
  });
}