import request from 'umi-request';

export async function queryBasicProfile() {
  return request('/api/profile/basic');
}

export async function queryProfile() {
  return request('/api/details/1');
}
