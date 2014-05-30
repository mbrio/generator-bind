'use strict';

let assert = require('assert');
let bind = require('./index').polyfil();
require('./index').polyfil();

function Counter(max) { this.max = max || 5; }

Counter.prototype.increment = function* increment() {
  let current = 0;

  while (current <= this.max) {
    yield current++;
  }
};

let c = new Counter();
let bound = bind(c, c.increment);
let polyfilled = c.increment.bind(c);

assert(c.increment.constructor.name === 'GeneratorFunction');
assert(bound.constructor.name === 'GeneratorFunction');
assert(polyfilled.constructor.name === 'GeneratorFunction');

let i = 0, j = c.max;
for (let cnt of c.increment()) { i = cnt; }
assert(i === j);

i = 0;
for (let cnt of bound()) { i = cnt; }
assert(i === j);

i = 0;
for (let cnt of polyfilled()) { i = cnt; }
assert(i === j);