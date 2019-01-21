const xueUiqueIdMap = {}

function uniqueId(prefix = '$xue$') {
  if (!xueUiqueIdMap[prefix]) {
    xueUiqueIdMap[prefix] = 0
  }
  xueUiqueIdMap[prefix]++
  return prefix + `${xueUiqueIdMap[prefix]}`
}

export default uniqueId
