// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AnyObject = { [k in string]: any }

export function deepEqual(obj1: AnyObject, obj2: AnyObject) {
  if (obj1 === obj2) {
    return true // If they reference the same object, they are equal.
  }

  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    return false // If one of them is not an object, they are not equal.
  }

  const keys1 = Object.keys(obj1)
  const keys2 = Object.keys(obj2)

  if (keys1.length !== keys2.length) {
    return false // If they have a different number of properties, they are not equal.
  }

  for (const key of keys1) {
    if (!deepEqual(obj1[key], obj2[key])) {
      return false // Recursively check each property for equality.
    }
  }

  return true // If all checks pass, the objects are deep equal.
}
