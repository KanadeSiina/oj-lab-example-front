import rest from '../rest'

export async function login(account, password) {
  let res = await rest.post(`/api/user/login`, {'username': account, 'password': password})
  return res.data
}

export async function getCurrentUser() {
  let res = await rest.get(`/api/user/current`)
  return res.data.username
}