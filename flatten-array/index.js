module.exports = flatten;

function flatten (list, result) {
  if(!Array.isArray(list)) return list;

  var i = -1;
  var len = list.length;

  result || (result = []);

  while (++i < len) {
    if (!Array.isArray(list[i])) {
      result.push(list[i]);
      continue;
    }

    flatten(list[i], result);
  }

  return result;
}
