const isType = <T>(type: string) => (obj: unknown): obj is T =>
  obj != null && Object.prototype.toString.call(obj) === `[object ${type}]`
export const isFn = isType<(...args: any[]) => any>('Function')
export const isArr = Array.isArray || isType<unknown[]>('Array')
export const isPlainObj = isType<object>('Object')
export const isStr = isType<string>('String')
export const isBool = isType<boolean>('Boolean')
export const isNum = isType<number>('Number')
export const isObj = (val: unknown): val is object => typeof val === 'object'
export const isRegExp = isType<RegExp>('RegExp')

const isArray = isArr
const keyList = Object.keys
const hasProp = Object.prototype.hasOwnProperty

export const toArray = <T>(val: T | T[]) : T[]=>Array.isArray(val) ? val : val !== undefined ? [val] : []

export const isEqual = (a: any, b: any) => {
  if (a === b) {
    return true
  }
  if (a && b && typeof a === 'object' && typeof b === 'object') {
    const arrA = isArray(a)
    const arrB = isArray(b)
    let i
    let length
    let key

    if (arrA && arrB) {
      length = a.length
      if (length !== b.length) {
        return false
      }
      for (i = length; i-- !== 0;) {
        if (!isEqual(a[i], b[i])) {
          return false
        }
      }
      return true
    }

    if (arrA !== arrB) {
      return false
    }

    const keys = keyList(a)
    length = keys.length

    if (length !== keyList(b).length) {
      return false
    }

    for (i = length; i-- !== 0;) {
      if (!hasProp.call(b, keys[i])) {
        return false
      }
    }
    for (i = length; i-- !== 0;) {
      key = keys[i]
      if (!isEqual(a[key], b[key])) {
        return false
      }
    }

    return true
  }
  return a !== a && b !== b
}
