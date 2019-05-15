interface IDdateLists {
  prefix: number[];
  dateList: number[];
  suffix: number[];
}

function getDateLists(year: number, month: number): IDdateLists {
  // 获取当月天数即获取下月的第0天
  const currentMonthLength = new Date(year, month, 0).getDate();
  const dateList = Array.from(
    { length: currentMonthLength },
    (val, index) => index + 1
  );
  // 获取上一月天数
  const prevMonthLength = new Date(year, month - 1, 0).getDate();
  // 获取当月第一天的星期，星期天则设置为7
  const startDay = new Date(year, month - 1, 1).getDay() || 7;
  // 当月第一天不为星期一则需要填补前缀
  const prefix: number[] = [];
  for (let i = 0; i < startDay - 1; i++) {
    prefix.unshift(prevMonthLength - i);
  }
  // 前缀和当前月不满42则需填后缀
  const distance = 42 - prefix.length - dateList.length;
  const suffix: number[] = [];
  for (let i = 0; i < distance; i++) {
    suffix.push(i + 1);
  }
  return { prefix, dateList, suffix };
}

export default getDateLists;
