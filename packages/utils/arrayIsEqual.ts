function arrayIsEqual(
  arr1: Array<string | number>,
  arr2: Array<string | number>
): boolean {
  if (arr1.length !== arr2.length) {
    return false;
  }
  const newArr1 = JSON.parse(JSON.stringify(arr1)).sort();
  const newArr2 = JSON.parse(JSON.stringify(arr2)).sort();
  for (let i = 0; i < newArr1.length; i++) {
    if (newArr1[i] !== newArr2[i]) {
      return false;
    }
  }
  return true;
}

export default arrayIsEqual;
