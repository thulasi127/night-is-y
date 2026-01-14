// frontend-nuxt/utils/sanityClient.ts
import { createClient } from '@sanity/client'
import { useRuntimeConfig } from '#imports'

export const sanityClient = () => {
  const config = useRuntimeConfig()

  return createClient({
    projectId: config.public.sanityProjectId,
    dataset: config.public.sanityDataset,
    apiVersion: config.public.sanityApiVersion,
    useCdn: config.public.sanityUseCdn,
  })
}
