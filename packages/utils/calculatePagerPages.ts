function calculatePagerPages(current: number, total: number): any[] {
  const arr = getUniqueArray(getOriginArray(current, total)).sort(
    (a, b) => a - b
  );
  const base: any[] = [];
  const pages = arr.reduce((prev, item) => {
    prev.push(item);
    const length = prev.length;
    const temp = prev[length - 2];
    if (temp && item - temp > 1) {
      prev.splice(prev.length - 1, 0, "...");
    }
    return prev;
  }, base);
  return pages.filter(n => (n >= 1 && n <= total) || n === "...");
}

function getOriginArray(current: number, total: number) {
  if (current <= 4) {
    return [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      current - 1,
      current - 2,
      current,
      current + 1,
      current + 2,
      total
    ];
  }
  if (current >= total - 3) {
    return [
      1,
      current - 1,
      current - 2,
      current,
      current + 1,
      current + 2,
      total - 6,
      total - 5,
      total - 4,
      total - 3,
      total - 2,
      total - 1,
      total
    ];
  }
  return [
    1,
    current - 1,
    current - 2,
    current,
    current + 1,
    current + 2,
    total
  ];
}

function getUniqueArray(arr: number[]): number[] {
  const map = {};
  const results: number[] = [];
  arr.forEach(item => {
    if (!map[item]) {
      results.push(item);
      map[item] = true;
    }
  });
  return results;
}

export default calculatePagerPages;
