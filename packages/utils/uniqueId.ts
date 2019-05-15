const xueUniqueIdMap = {};

function uniqueId(prefix = "$xue$") {
  if (!xueUniqueIdMap[prefix]) {
    xueUniqueIdMap[prefix] = 0;
  }
  xueUniqueIdMap[prefix]++;
  return prefix + `${xueUniqueIdMap[prefix]}`;
}

export default uniqueId;
