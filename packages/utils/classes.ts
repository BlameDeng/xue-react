const prefix = "xue";

function classes(componentName: string, ...args: any): string {
  const className = new Array<string>();
  args.forEach((arg: any) => {
    if (typeof arg === "string") {
      className.push(
        `${prefix}-${componentName.toLowerCase()}${arg && "-" + arg}`
      );
    } else if (arg instanceof Array) {
      arg.forEach(str => typeof str === "string" && className.push(str));
    } else if (typeof arg === "object" && !(arg instanceof Array)) {
      for (const key in arg) {
        if (arg.hasOwnProperty(key) && arg[key]) {
          className.push(key);
        }
      }
    }
  });
  return className.filter(v => v).join(" ");
}

export default classes;
