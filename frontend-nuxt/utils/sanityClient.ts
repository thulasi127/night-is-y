// utils/sanityClient.ts
import { createClient } from '@sanity/client'

const projectId = process.env.SANITY_PROJECT_ID || ''
const dataset = process.env.SANITY_DATASET || 'production'
const token = process.env.SANITY_READ_TOKEN || undefined

export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2023-08-01',
  useCdn: !token,        // if we have a token, skip CDN
  token,                 // needed for private datasets
  perspective: 'published'
})
