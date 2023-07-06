export function get(name) {
  return parseInt(window.localStorage.getItem(name) || 0, 10)
}

export function set(name, value) {
  window.localStorage.setItem(name, value)
}
