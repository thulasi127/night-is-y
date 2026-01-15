export const CONTACT_QUERY = `
  *[_type == "contact" && _id == "contact-page"][0]{
    "backgroundVideo": backgroundVideo.asset->url,
    people[]{
      name,
      entries[]{
        role,
        name,
        email
      }
    }
  }
`
