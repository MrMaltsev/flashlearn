
export function saveAuthData(token, username) {
  localStorage.setItem("token", token);
  localStorage.setItem("username", username);
}

export function getToken() {
  return localStorage.getItem("token");
}

export function getUsername() {
  return localStorage.getItem("username");
}

export function clearAuthData() {
  localStorage.removeItem("token");
  localStorage.removeItem("username");
}

export function isLoggedIn() {
  return !!localStorage.getItem("token");
}
