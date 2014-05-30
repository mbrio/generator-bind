# generator-bind

[![Build Status](https://travis-ci.org/mbrio/generator-bind.svg?branch=master)](https://travis-ci.org/mbrio/generator-bind)

  A `bind` polyfill that returns a `GeneratorFunction` when the function being bound is a generator.

## Installation

```
npm install generator-bind
```

## Rant

  I found what I believe to be a deficiency in the `bind` function in node v0.11 whereby calling `bind` on a generator returns a normal function.

```js
function normalFunc() {...}
normalFunc.constructor.name // Function
normalFunc.bind(null).constructor.name // Function

function* genFunc() {...}
genFunc.constructor.name // GeneratorFunction
genFunc.bind(null).constructor.name // Function
```

  This can cause issues when attempting to use the various async libraries that utilize generators with an OOP design pattern.

```js
function Klass() {...}
Klass.prototype.someAsync = function* () {...}
let inst = new Klass();

co(inst.someAsync.bind(inst))()
```

  The above code will cause an error with `co` because the native `bind` function does not return a generator.

  This is why I've built *generator-bind*.

## Usage

  It can be used as a function:

```js
let genbind = require('generator-bind');
genbind(ctx, genFunc);
```

  or a polyfill:

```js
let genbind = require('generator-bind').polyfill();
genFunc.bind(ctx);
```

  The polyfill also returns the new `bind` function so if you choose to use the polyfill you have the option of using the function as well.

## License

  Copyright (c) 2014 Michael Diolosa <[michael.diolosa@gmail.com](mailto:michael.diolosa@gmail.com)>

  This library is licensed under the [MIT license](http://opensource.org/licenses/MIT).