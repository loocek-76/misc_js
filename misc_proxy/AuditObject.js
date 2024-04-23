const auditObject =
  obj => {

    const log = [];

    return new Proxy(obj, {
      get(target, key) {
        if (key === 'history') {
          return log;
        }
        return Reflect.get(target, key);
      },
      set(target, key, value) {
        if (key === 'history') {
          console.log('Cannot overwrite history');
          return false;
        }
        Reflect.set(target, key, value);
        log.push({ key, value, timestamp: new Date() });
        return true;
      }
    });
  };

export default auditObject;