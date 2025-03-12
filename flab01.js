//deepcopy
//mapdeepcopy

function deepCopyObj(value) {
  if (value === null || typeof value == !Object) {
    return value;
  }

  if (value instanceof Map) {
    var result = {};

    value.forEach((val, key) => {
      result.set(deepCopyObj(key), deepCopyObj(val));
    });
    return result;
  }

  if (value instanceof Set) {
    var result = new Set();
    value.forEach((item) => {
      result.add(deepCopyObj(item));
    });

    return result;
  }

  if (value instanceof Date) {
    return new Date(value.getDate());
  }

  if (value instanceof RegExp) {
    return new RegExp(value.source, value.flags);
  }
}
