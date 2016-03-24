Iterates a function asynchronously.

## Install

```
npm install iter
```

## Usage

```js
iter(20, function(next, i){ /* or: iter(0, 20, .. */
  console.log('i: %d', i);

  setTimeout(function(){
    next();
  }, 250);
});
```

Callbacks;

```
iter(20)
  .error(function(error){ throw error; })
  .done(function(){ console.log('done'); })
  .run(function(next, i){
    console.log('i: %d', i);
    next(); // to pass an error: next(new Error('failed!'))
  });
```

## Parallel

It's serial by default. Use `parallel` method to make it parallel.

```js
iter.parallel(5, function (done, i) {
  setTimeout(function () {
    console.log(i)
    done()
  }, 1000 - (i * 200))
})
```

Will output:

```
4
3
2
1
0
```
