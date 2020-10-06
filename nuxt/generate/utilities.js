/**
 * @name arrayAsFatherChilds
 * @description This creates an array from 1st level to father/childs array.
 * @param {Array} straightArray Array as 'first-level' only of voices.
 * @return {Array}
 */
export const arrayAsFatherChilds = straightArray => straightArray.reduce((accumulator, current) => {
  const { menu_item_parent } = current
  const parsedParentID = parseInt(menu_item_parent, 10)

  if (!parsedParentID) {
    // Father has no childs.
    accumulator.push({ ...current, sub_menu: [] })
  } else {
    const parentIndex = accumulator.findIndex(item => item.ID === parsedParentID);
    if (parentIndex >= 0) {
      (!accumulator[parentIndex].sub_menu) && (accumulator[parentIndex].sub_menu = [])
      accumulator[parentIndex].sub_menu.push(current)
    }
  }

  return accumulator
}, [])

/**
 * @description Given an array from upper fn (so father/childs)
 * @param arrayFatherChilds
 * @return {Array} Array with only paths as string (of course)
 */
export const straightPaths = arrayFatherChilds => arrayFatherChilds.reduce(
  (acc, curr) => {
    if(curr.sub_menu.length) {
      acc = acc.concat(curr.sub_menu.map(
        child => `/${curr.slug}/${child.slug}`
      ))
    } else {
      acc.push(`/${curr.slug}`)
    }

    return acc
  }, [])
