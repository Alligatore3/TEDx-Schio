import axios from "axios";
import { ENVs } from '../constants'

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
    const { data: menuVoices } = await axios.get(`${ ENVs.MAMP.getFullAPIPath() }/menu`)
    const { data: allSpeakers } = await axios.get(`${ ENVs.MAMP.getFullAPIPath() }/speakers`)

    return menuVoices.map( voice => voice.title.toLowerCase() ).concat(
      allSpeakers.map( speaker => `speaker/${speaker.slug}`)
    )
  }
})
