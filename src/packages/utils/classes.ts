function classes(...args: any): string {
  const className: string[] = []
  args.forEach((arg: any) => {
    if (typeof arg === 'string') {
      className.push(arg)
    } else if (typeof arg === 'object') {
      for (const key in arg) {
        if (arg.hasOwnProperty(key) && arg[key]) {
          className.push(key)
        }
      }
    } else if (arg instanceof Array) {
      arg.forEach(str => typeof str === 'string' && className.push(str))
    }
  })
  return className.filter(v => v).join(' ')
}

export default classes
