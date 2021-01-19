export function isLogined() {
  if (localStorage.getItem("token")) {
    return true;
  }
  return false;
}

export function setToken(token) {
  localStorage.setItem("token", token);
}

export function getToken() {
  return localStorage.getItem("token");
}

export function removeToken() {
  localStorage.removeItem("token");
}
