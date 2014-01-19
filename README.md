## flat-glob

Return glob applied and flattened version of the given array

## Install

```bash
$ npm install flat-glob
```

## Usage

```js
flatGlob = require('flat-glob')

flatGlob(['foo.js', 'styles/**/*.css', 'templates/index.html', 'templates/**/*.html'])
// => ['foo.js', 'styles/a.css', 'styles/b.css', 'templates/index.html', 'templates/foo.html', 'templates/bar.html']
```
