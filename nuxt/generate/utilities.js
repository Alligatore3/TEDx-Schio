/**
 * @name arrayAsFatherChilds
 * @description This creates an array from 1st level to father/childs array.
 * @param {Array} straightArray Array as 'first-level' only of voices.
 * @return {Array}
 */
export const arrayAsFatherChilds = straightArray => straightArray.reduce(
  (acc, curr, index) => {
    const itemId = parseInt(curr.menu_item_parent, 10)
    const fatherIndex = itemId === 0 ? index : 0

    if (itemId === 0) {
      acc.push({ ...curr, childs: [] })
    } else {
      acc[fatherIndex] && acc[fatherIndex].childs.push(curr)
    }

    return acc
  }, [])

/**
 * @description Given an array from upper fn (so father/childs)
 * @param arrayFatherChilds
 * @return {Array} Array with only paths as string (of course)
 */
export const straightPaths = arrayFatherChilds => arrayFatherChilds.reduce(
  (acc, curr) => {
    if(curr.childs.length) {
      const paths = curr.childs.map(
        child => `/${curr.slug}/${child.slug}`
      )

      acc = acc.concat(paths)
    } else {
      acc.push(`/${curr.slug}`)
    }

    return acc
  }, [])
