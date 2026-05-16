function objectMap(obj, callback, thisArg) {
    if (obj == null) {
        throw new TypeError();
    }
    if (Array.isArray(obj)) {
        return obj.map(callback, thisArg);
    }
    const type = typeof obj;
    if (type !== 'object' && type !== 'string') {
        throw new TypeError('type is not object and not string');
    }
    // Check for iterable (including strings)
    if (typeof obj[Symbol.iterator] === 'function') {
        return Array.from(obj, callback, thisArg);
    }
    // Check for ArrayLike
    if (typeof obj.length === 'number') {
        return Array.from(obj, callback, thisArg);
    }
    // Handle Record<string, T>
    return Object.values(obj).map(callback, thisArg);
}

export { objectMap as default };
