import { createClient } from '@sanity/client'

export const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID!,  // from sanity.json / your project settings
  dataset: process.env.SANITY_DATASET || 'production',
  apiVersion: '2023-08-01', // use today’s date for freshness
  useCdn: true,             // faster, cached responses for public data
})
