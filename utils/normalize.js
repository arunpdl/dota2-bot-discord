const normalize = (data) => {
  "use strict";
  const ret = {};
  if (!data) {
    return ret;
  }
  for (const item in data) {
    if (Array.isArray(data)) {
      if (data[item].id) {
        ret[data[item].id] = normalize(data[item]);
      }
    } else if (data.hasOwnProperty(item)) {
      if (item === "id") {
        continue;
      }
      ret[item] = data[item];
    }
  }
  return ret;
};

module.exports = {
  normalize,
};
