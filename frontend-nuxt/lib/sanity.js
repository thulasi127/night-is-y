import { createClient } from '@sanity/client'

export default createClient({
    projectId: 'a9t1mosy',
    dataset: 'production',
    useCdn: true,
    apiVersion: '2025-08-20'
})