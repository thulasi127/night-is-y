import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'video',
      title: 'Background Video',
      type: 'file',
      options: {
        accept: 'video/*',
      },
      description: 'Upload the looping background video for the homepage',
    }),
  ],
})
