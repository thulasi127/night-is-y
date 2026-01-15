// frontend-nuxt/lib/queries/press.ts
export const PRESS_QUERY = `
  *[_type == "press" && _id == "press-page"][0]{
    projects[]{
      project,
      quotes[]{
        text,
        source,
        "logo": logo.asset->url,
        invertDarkLogo
      }
    }
  }
`
