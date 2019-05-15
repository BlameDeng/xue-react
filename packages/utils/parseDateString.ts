function parseDateString(str?: string) {
  if (str) {
    const dateObject = new Date(str);
    return {
      year: dateObject.getFullYear(),
      month: dateObject.getMonth() + 1,
      date: dateObject.getDate()
    };
  } else {
    const dateObject = new Date();
    return {
      year: dateObject.getFullYear(),
      month: dateObject.getMonth() + 1,
      date: dateObject.getDate()
    };
  }
}

export default parseDateString;
