'use strict';
var createReadFilterProxy = function (target, filters) {
    if (filters === void 0) { filters = {}; }
    if (target == null || typeof target !== 'object') {
        throw new TypeError();
    }
    var filterKeys = Object.keys(filters).filter(function (key) { return typeof filters[key] === 'function'; });
    if (!filterKeys) {
        return target;
    }
    var filtersMap = filterKeys.reduce(function (result, key) {
        result[key] = filters[key];
        return result;
    }, Object.create(null));
    filters = null;
    filterKeys = null;
    return new Proxy(target, {
        get: function (target, property, receiver) {
            var original = Reflect.get(target, property, receiver);
            return property in filtersMap ? filtersMap[property](original, target) : original;
        }
    });
};
module.exports = createReadFilterProxy;
