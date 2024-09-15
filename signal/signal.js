
let subscriber = null;


function signal(value) {
  const subscribers = new Set();

  const handler = {
    get(_, prop) {
      if (subscriber) {
        subscribers.add(subscriber);
      }
      return value[prop];
    },

    set(_, prop, update) {
      value[prop] = update;
      subscribers.forEach(fn => fn());
    }
  }

  return {
    _proxy: new Proxy(value, handler),

    get value() {
      if (subscriber) {
        subscribers.add(subscriber);
      }
      return this._proxy;
    },

    set value(update) {
      value = update;
      subscribers.forEach(fn => fn());
    }
  }
}


function slot(fn) {
  subscriber = fn;
  fn();
  subscriber = null;
}

module.exports = { signal, slot };