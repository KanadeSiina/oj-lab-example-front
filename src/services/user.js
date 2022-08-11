export function login(account, password) {
  var formdata = new FormData();
  formdata.append("password", password);

  var requestOptions = {
    method: 'POST',
    body: formdata,
    redirect: 'follow'
  };

  return fetch(`/api/user/${account}/login`, requestOptions)
}

export function getCurrentUser() {
  var requestOptions = {
    method: 'GET',
    redirect: 'follow'
  };

  return fetch(`/api/user/current`, requestOptions)
}