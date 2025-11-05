export function saveUser(user) {
  localStorage.setItem("user", JSON.stringify(user));
}
export function getUser() {
  const s = localStorage.getItem("user");
  return s ? JSON.parse(s) : null;
}
export function logout() {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  window.location.href = "/signin";
}
