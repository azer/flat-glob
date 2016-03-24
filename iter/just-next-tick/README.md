## go (a.k.a just-next-tick)

Cross-platform next-tick with fallback to setTimeout.

## Install

```bash
$ npm install go # or npm install just-next-tick
```

## Usage

```js
var go = require('go')

go(function () {
  console.log('world')
})

console.log('hello')

// hello
// world
```
