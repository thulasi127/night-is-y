import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'projectMenu',
  title: 'PROJECT MENU',
  type: 'document',

  // ✅ ADD THIS
  preview: {
    prepare() {
      return {
        title: 'Projects Menu',
        subtitle: 'Edit the images shown on the Projects page',
      }
    },
  },

  fields: [
    defineField({
      name: 'filmSeries',
      title: 'Film & Series',
      type: 'object',
      fields: [
        defineField({
          name: 'poster',
          title: 'Upload cover image',
          type: 'image',
          options: {
    hotspot: true,
    accept: 'image/*',
  },
  description: 'Upload an image (Recommended: no wider than 4000 pixels, under 3MB)',
  validation: Rule =>
    Rule.required().warning('Large images may affect site performance.'),
}),
      ],
    }),

    defineField({
      name: 'musicVideos',
      title: 'Music Videos',
      type: 'object',
      fields: [
        defineField({
          name: 'poster',
          title: 'Upload cover image',
          type: 'image',
          options: {
    hotspot: true,
    accept: 'image/*',
  },
  description: 'Upload an image (Recommended: no wider than 4000 pixels, under 3MB)',
  validation: Rule =>
    Rule.required().warning('Large images may affect site performance.'),
}),
      ],
    }),

    defineField({
      name: 'inDevelopment',
      title: 'In Development',
      type: 'object',
      fields: [
        defineField({
          name: 'poster',
          title: 'Upload cover image',
          type: 'image',
          options: {
    hotspot: true,
    accept: 'image/*',
  },
  description: 'Upload an image (Recommended: no wider than 4000 pixels, under 3MB)',
  validation: Rule =>
    Rule.required().warning('Large images may affect site performance.'),
}),
      ],
    }),
  ],
})
