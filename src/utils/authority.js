// use localStorage to store the authority info, which might be sent from server in actual project.
export function getAuthority() {
  const authorities = localStorage.getItem('authorities');
  return authorities === null ? 'ROLE_GUEST' : authorities.split(',');
}

export function setAuthority(authorities) {
  return localStorage.setItem('authorities', authorities);
}

export function setToken(accessToken, refreshToken) {
  localStorage.setItem('access_token', accessToken);
  localStorage.setItem('refresh_token', refreshToken);
}

export function getAccessToken() {
  return localStorage.getItem('access_token');
}

export function getRefreshToken() {
  return localStorage.getItem('refresh_token');
}

export function deleteTokens() {
  localStorage.removeItem('access_token');
  localStorage.removeItem('refresh_token');
}
