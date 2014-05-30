'use strict';

let slice = Array.prototype.slice;

if (!Function.prototype.__genOrigBind) {
  Function.prototype.__genOrigBind = Function.prototype.bind;
}

let nativeBind = Function.prototype.__genOrigBind;

function bind(ctx, fn) {
  let args = [ctx].concat(slice.call(arguments, 2));

  if (fn.constructor.name === 'GeneratorFunction') {
    return function* boundGenerator() {
      let iter = fn.apply(ctx, args.slice(1));
      for (let i of iter) { yield i; }
    };
  }

  return nativeBind.apply(fn, args);
}

bind.polyfil = function polyfil() {
  function* polyfilTest() { yield 0; }
  let bound = polyfilTest.bind(null);

  if (bound.constructor.name !== 'GeneratorFunction') {
    Function.prototype.__bind = nativeBind;

    Function.prototype.bind = function polyfilBind(ctx) {
      let args = [ctx, this].concat(slice.call(arguments, 1));
      return bind.apply(null, args);
    };
  }

  return bind;
};

exports = module.exports = bind;