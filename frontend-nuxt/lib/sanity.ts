import { createClient } from '@sanity/client'

export const sanity = createClient({
  projectId: 'a9t1mosy',
  dataset: 'production',
  apiVersion: '2023-10-01',
  useCdn: true,
})
