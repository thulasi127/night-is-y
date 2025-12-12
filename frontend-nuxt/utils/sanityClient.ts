import { createClient } from '@sanity/client'

const projectId = process.env.SANITY_PROJECT_ID || ''
const dataset = process.env.SANITY_DATASET || 'production'
// Only send the token on the server bundle
const token = process.server ? process.env.SANITY_READ_TOKEN : undefined

export default createClient({
    projectId: 'a9t1mosy',
    dataset: 'production',
    useCdn: true,
    apiVersion: '2025-08-20'
})