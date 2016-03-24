module.exports = nextTick;

function nextTick (fn) {
  if (typeof process != 'undefined' && process.nextTick) {
    return process.nextTick(fn);
  }

  if (typeof setImmediate != 'undefined') {
    return setImmediate(fn);
  }

  setTimeout(fn, 0);
}
