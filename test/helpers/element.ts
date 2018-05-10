export const getChildren = (el: JSX.Element): JSX.Element[] => {
  return el.props.children || []
}

export const getChildrenTypes = (el: JSX.Element): (string | Function)[] => {
  return getChildren(el).map(el => el.type)
}

export const findChild = (el: JSX.Element, type: string | Function): JSX.Element | null => {
  const matches = getChildren(el).filter(el => el.type === type)
  return matches.length > 0 ? matches[0] : null
}

export const getChild = (el: JSX.Element, index: number): JSX.Element => {
  return getChildren(el)[index]
}

export const getContents = (el: JSX.Element): string => {
  return el.props.children
}
