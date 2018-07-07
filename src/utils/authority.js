// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority() {
  const authorities = localStorage.getItem('authorities');
  return authorities === null ? 'ROLE_GUEST' : authorities.split(',');
}

export function setAuthority(authorities) {
  return localStorage.setItem('authorities', authorities);
}

export function setToken(username, accessToken, refreshToken) {
  localStorage.setItem('username', username);
  localStorage.setItem('access_token', accessToken);
  localStorage.setItem('refresh_token', refreshToken);
}

export function getCurrentUser() {
  return localStorage.getItem('username');
}

export function setCurrentUser(username) {
  return localStorage.setItem('username', username);
}

export function getAccessToken() {
  return localStorage.getItem('access_token');
}

export function getRefreshToken() {
  return localStorage.getItem('refresh_token');
}

export function deleteTokens() {
  localStorage.removeItem('username');
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
}
