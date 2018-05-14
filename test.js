'use strict'

const assert = require('assert')
const equals = require('equals')
const jfn = require('.')

describe('jfn()', function () {
  it('should call a single function', function (done) {
    jfn(done)()
  })

  it('should call multiple functions in serial', function () {
    const add1 = n => n + 1
    const add2 = n => n + 2
    const add3 = jfn(add1, add2)
    assert.strictEqual(add3(1), 4)
  })

  it('should flatten functions list', function () {
    const add1 = n => n + 1
    const add2 = n => n + 2
    const add3 = jfn([add1, [add2]])
    assert.strictEqual(add3(1), 4)
  })

  it('should include other arguments', function () {
    const add = (x, y) => x + y
    const mul = (x, y) => x * y
    assert.strictEqual(jfn(add, mul)(1, 2), 6)
  })

  it('should pass serial result as argument of index `arg`', function () {
    const add = (x, y) => x + y
    const mul = (x, y) => x * y
    assert.strictEqual(jfn(add, mul, {arg: 1})(1, 2), 3)
  })

  it('should call multiple functions in parallel if `parallel` is true', function () {
    const add1 = n => n + 1
    const add2 = n => n + 2
    assert(equals(jfn(add1, add2, {parallel: true})(1), [2, 3]))
  })

  it('should return the first argument if no functions provided', function () {
    assert.strictEqual(jfn()(123), 123)
  })
})
