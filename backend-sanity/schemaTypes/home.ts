// backend-sanity/schemaTypes/home.ts
import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'homepage',
  title: 'HOMEPAGE',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'Homepage',
      readOnly: true,
      hidden: true,
    }),
    defineField({
      name: 'bgVideo',
      title: 'Background Video',
      type: 'file',
      options: {
    accept: 'video/mp4',
  },
  description: 'Upload an MP4 video (Recommended: 1920x1080, under 100MB)',
}),
    defineField({
      name: 'alt',
      title: 'Video Alt Text (Optional)',
      type: 'string',
      description: 'Optional. Describe the video for accessibility and SEO (e.g., “Looping footage of ocean waves”)',
      validation: Rule => Rule.optional(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Homepage',
        subtitle: 'Homepage of the site',
      }
    },
  },
})