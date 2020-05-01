import axios from "axios";

import { ENVs } from '../constants'
import { arrayAsFatherChilds } from './utilities'

/**
 * @description The reason for why nuxt generate doesn't prerender dynamic routes out of the box,
 * is that the framework doesn't know our dynamic content.
 * We have to tell Nuxt about our dynamic content, for it to generate the static files.
 * @see https://vueschool.io/lessons/prerendering-dynamic-routes
 * @return {{routes(): Promise<*>, devtools: boolean, dir: string}}
 */
export const generateConfig = () => ({
  dir: 'tedx-dist',
  devtools: false,
  async routes() {
    /**
     * @see https://axios.nuxtjs.org/usage.html#shortcuts
     */
    const { data: menuVoices } = await axios.get(`${ ENVs.getFullAPIPath(true) }/menu`)
    const { data: allSpeakers } = await axios.get(`${ ENVs.getFullAPIPath(true) }/speakers`)

    const finalPaths = arrayAsFatherChilds(menuVoices).reduce(
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

    return finalPaths.concat(allSpeakers.map( speaker => `speaker/${speaker.slug}`))
  }
})
