import { createClient } from '@sanity/client'

export default createClient({
    projectId: 'your_project_id',
    dataset: 'production',
    useCdn: true,
    apiVersion: '2025-08-20'
})