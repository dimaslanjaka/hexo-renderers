'use strict';

function createReadFilterProxy<T extends Record<string, any>>(
  target: T,
  filters: Record<string, (value: any, target: T) => any> = {}
): T {
  if (target == null || typeof target !== 'object') {
    throw new TypeError();
  }

  const filterKeys = Object.keys(filters).filter((key) => typeof filters[key] === 'function');

  if (filterKeys.length === 0) {
    return target;
  }

  const filtersMap = filterKeys.reduce((result, key) => {
    result[key] = filters[key];
    return result;
  }, Object.create(null));

  return new Proxy(target, {
    get(target, property: PropertyKey, receiver) {
      const original = Reflect.get(target, property, receiver);
      return property in filtersMap ? filtersMap[property](original, target) : original;
    }
  });
}

export default createReadFilterProxy;
