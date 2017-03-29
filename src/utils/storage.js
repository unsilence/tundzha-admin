export default {
  set(key, values) {
    localStorage.setItem(key, JSON.stringify(values));
  },
  get(key) {
    return JSON.parse(localStorage.getItem(key));
  },
  del(key) {
    localStorage.removeItem(key);
  },
  clear() {
    localStorage.clear();
  },
};
