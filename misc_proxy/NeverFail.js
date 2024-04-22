import Undefined from "./Undefined.js";

export default function neverFail(obj) {
  return new Proxy(obj, {
    get(target, key) {
      const accessedProperty = Reflect.get(target, key);

      if (typeof accessedProperty === 'object') {
        return neverFail(accessedProperty);
      } else {
        return accessedProperty === undefined ? Undefined : accessedProperty;
      }
    }
  });
}