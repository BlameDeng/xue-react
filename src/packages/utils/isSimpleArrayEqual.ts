function isSimpleArrayEqual(
  arr1: string[] | number[],
  arr2: string[] | number[]
): boolean {
  if (arr1.length !== arr2.length) {
    return false
  }
  const newArr1 = JSON.parse(JSON.stringify(arr1)).sort()
  const newArr2 = JSON.parse(JSON.stringify(arr2)).sort()
  for (const index of newArr1.keys()) {
    if (newArr1[index] !== newArr2[index]) {
      return false
    }
  }
  return true
}

export default isSimpleArrayEqual
