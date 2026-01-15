// frontend-nuxt/lib/queries/homepage.ts

export const HOMEPAGE_QUERY = `
  *[_type == "homepage" && _id == "homepage"][0]{
    "src": bgVideo.asset->url,
    alt
  }
`
