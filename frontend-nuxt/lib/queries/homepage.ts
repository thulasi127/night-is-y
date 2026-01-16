// frontend-nuxt/lib/queries/homepage.ts

export const HOMEPAGE_QUERY = `
  *[_type == "home"][0]{
    "src": bgVideo.asset->url,
    alt
  }
`