# Joined Function (jfn)

Creates a function that runs multiple functions in serial or in parallel.

## Installation

Requires [Node.js](https://nodejs.org/) 6.0.0 or above.

```bash
npm i jfn
```

## API

The module exports a single function.

### Parameters

1. Variadic: `...fns` (one or more of: function, or array of functions): The functions to be combined into one.
2. Optional: Object argument:
    * `parallel` or `p` (boolean): If `true`, runs the functions in parallel, giving the same arguments to each function, and compiling the returned results into an array. If `false`, runs the functions in serial, passing the result of each function to the next in the list, and returning a single value at the end. Defaults to `false`.
    * `arg` (positive integer): If in serial mode, the result of each function will be passed to the next as an argument at this index. Defaults to `0`.

### Return Value

The return value of the last function in `fns` (if in serial mode) or an array of `fns` return values (if in parallel mode).

## Examples

### Serial Mode

```javascript
const jfn = require('jfn')

const add1 = n => n + 1
const add2 = n => n + 2
const add3 = jfn(add1, add2)

add3(1) // 4
```

### Parallel Mode

```javascript
const jfn = require('jfn')

const add1 = n => n + 1
const add2 = n => n + 2
const add = jfn(add1, add2, {parallel: true})

add(1) // [2, 3]
```

## Related

For more projects like this, check out [@lamansky/fn](https://github.com/lamansky/fn).
