var nextTick = require("just-next-tick");

module.exports = parallel;

function parallel (from, to, chain) {
  var missing = [];
  var refused;

  nextTick(function () {
    next(0);
  });

  function next (i) {
    if (i >= to) return;

    missing.push(i);

    chain.step()(function (error) {
      if (refused) return;

      if (error) {
        refused = true;
        chain.error() && chain.error()(error);
        return;
      }

      missing.splice(i, 1);

      if (missing.length == 0) {
        chain.complete() && chain.complete()();
      }

    }, i);

    next(i+1);
  };
}
