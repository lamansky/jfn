'use strict'

const flatten = require('@lamansky/flatten')
const vfn = require('vfn')

module.exports = vfn({oo: true}, function jfn (fns, {arg = 0, p, parallel = p} = {}) {
  fns = flatten(fns)
  if (!fns.length) return x => x
  if (parallel) return (...args) => fns.map(f => f(...args))
  return (...args) => fns.reduce((r, f) => { r.splice(arg, 1, f(...r)); return r }, args)[arg]
})
