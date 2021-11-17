type ClassName = string | false | void | null | 0

export const classes = (...classNames: ClassName[]): string =>
  classNames.filter(Boolean).join(' ')
