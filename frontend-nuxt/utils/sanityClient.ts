import { createClient } from '@sanity/client'

const projectId = process.env.SANITY_PROJECT_ID || ''
const dataset = process.env.SANITY_DATASET || 'production'
// Only send the token on the server bundle
const token = process.server ? process.env.SANITY_READ_TOKEN : undefined

export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2023-08-01',
  useCdn: !token,         // use CDN for public datasets, skip when using token
  token,                  // needed only for private datasets
  perspective: 'published'
})
