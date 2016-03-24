var serial = require('./lib/serial');
var parallel = require('./lib/parallel');

module.exports = withChain(serial);
module.exports.parallel = withChain(parallel);

function withChain (start) {
  return function () {
    var args = Array.prototype.slice.call(arguments),
        from = args.length > 2 ? args[0] : 0,
        to = args.length > 2 ? args[1] : args[0],
        onStep = args.length > 2 ? args[2] : args[1],
        onComplete, onError;

    var chain = {
      run: onStepCb,
      step: onStepCb,
      error: onErrorCb,
      complete: onCompleteCb,
      done: onCompleteCb
    };

    start(from, to, chain);

    return chain;

    function onErrorCb(cb){
      if (arguments.length) {
        onError = cb;
        return chain;
      }

      return onError;
    }

    function onCompleteCb(cb){
      if (arguments.length) {
        onComplete = cb;
        return chain;
      }

      return onComplete;
    }

    function onStepCb(cb){
      if (arguments.length) {
        onStep = cb;
        return chain;
      }

      return onStep;
    }
  };
}
