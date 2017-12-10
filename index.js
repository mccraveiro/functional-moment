const moment = require('moment')

const isPlaceholder = x =>
  x != null &&
  typeof x === 'object' &&
  x['@@functional/placeholder'] === true

const __ = { '@@functional/placeholder': true }

const curry = fn => (...args) => {
  const data = args.slice(-1)[0]

  if (isPlaceholder(data)) {
    return fn.bind(null, ...args.slice(0, -1))
  }

  return fn(...args)
}

const now = () => moment()
const parse = data => moment(data)
const fparse = curry((format, data) => moment(data, format))
const format = curry((config, data) => data.format(config))
const add = curry((amount, key, data) => data.clone().add(amount, key))

module.exports = {
  __,
  now,
  parse,
  fparse,
  format,
  add,
}
