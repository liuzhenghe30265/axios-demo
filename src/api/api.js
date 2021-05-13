import request from './request'

export function fetchList(query) {
  return request({
    url: 'http://localhost:3000/data',
    method: 'get',
    params: query
  })
}

export function fetchList2(query) {
  return request({
    url: 'http://localhost:3000/data2',
    method: 'get',
    params: query
  })
}