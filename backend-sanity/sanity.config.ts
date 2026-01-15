import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { deskStructure } from './sanity/deskStructure'
import { resolveDocumentNode } from './sanity/resolveDocumentNode'
import { documentActions } from './sanity/documentActions' // optional
import { schemaTypes } from './schemaTypes'
import { resolveDocumentActions } from './document.actions'

export default defineConfig({
  name: 'default',
  title: 'niy-portfolio',

  projectId: 'a9t1mosy',
  dataset: 'production',

  plugins: [
    deskTool({
      structure: deskStructure,
      defaultDocumentNode: resolveDocumentNode,
    }),
  ],

  studio: {
    unstable_disableAutoUpdates: true,
  },

  schema: {
    types: schemaTypes,
  },

  document: {
    actions: documentActions, resolveDocumentActions, // <-- keep if you want to lock edits in published
  },
})
