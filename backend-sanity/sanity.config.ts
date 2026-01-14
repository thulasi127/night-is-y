import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { deskStructure } from './sanity/deskStructure'
import { resolveDocumentNode } from './sanity/resolveDocumentNode'
import { documentActions } from './sanity/documentActions' // optional
import { schemaTypes } from './schemaTypes'
import { resolveDocumentActions } from './document.actions'
import { visionTool } from '@sanity/vision'

export default defineConfig({
  name: 'default',
  title: 'Night is Y CMS',

  projectId: process.env.SANITY_STUDIO_PROJECT_ID!,
  dataset: process.env.SANITY_STUDIO_DATASET!,

  plugins: [
    deskTool({
      structure: deskStructure,
      defaultDocumentNode: resolveDocumentNode,
    }),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },

  document: {
    actions: documentActions, resolveDocumentActions, // <-- keep if you want to lock edits in published
  },
})
