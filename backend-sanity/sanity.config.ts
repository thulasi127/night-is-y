// sanity.config.ts
import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { schemaTypes } from './schemaTypes'
import { deskStructure } from './sanity/deskStructure'

export default defineConfig({
  name: 'default',
  title: 'Night is Y CMS',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,

  plugins: [deskTool({ structure: deskStructure })],

  schema: {
    types: schemaTypes,
  },
})
