// backend-sanity/schemaTypes/home.ts
import { defineType } from 'sanity'

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    {
      name: 'bgVideo',
      title: 'Background Video',
      type: 'file',
      options: {
        accept: 'video/*'
      }
    },
    {
      name: 'alt',
      title: 'Video Alt Text',
      type: 'string',
    },
  ],
})
