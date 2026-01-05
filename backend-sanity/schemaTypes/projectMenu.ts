// backend-sanity/schemaTypes/projectMenu.ts
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'projectMenu',
  title: 'Project Menu',
  type: 'document',
  fields: [
    defineField({
      name: 'filmSeries',
      title: 'Film & Series',
      type: 'object',
      fields: [
        { name: 'poster', title: 'Poster Image', type: 'image', options: { hotspot: true } }
      ]
    }),
    defineField({
      name: 'musicVideos',
      title: 'Music Videos',
      type: 'object',
      fields: [
        { name: 'poster', title: 'Poster Image', type: 'image', options: { hotspot: true } }
      ]
    }),
    defineField({
      name: 'inDevelopment',
      title: 'In Development',
      type: 'object',
      fields: [
        { name: 'poster', title: 'Poster Image', type: 'image', options: { hotspot: true } }
      ]
    }),
  ],
})
