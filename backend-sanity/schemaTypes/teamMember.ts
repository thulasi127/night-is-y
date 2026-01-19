import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'teamMember',
  title: 'TEAM MEMBERS',
  type: 'document',
  fields: [
    // defineField({
    //   name: 'title',
    //   title: 'Heading Title',
    //   type: 'string',
    //   initialValue: 'DEVERY JACOBS',
    //   validation: Rule => Rule.required(),
    // }),
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
  name: 'roles',
  title: 'Roles',
  type: 'array',
  of: [{ type: 'string' }],
  options: {
    layout: 'tags',
  },
  validation: Rule => Rule.min(1).required(),
  description: 'Type a role and press ENTER to add it. You can add multiple roles.',
}),
    defineField({
      name: 'headshot',
      title: 'Headshot',
      type: 'image',
      options: {
    hotspot: true,
    accept: 'image/*',
  },
  description: 'Upload an image (Recommended: no wider than 4000 pixels, under 3MB)',
  validation: Rule =>
    Rule.required().warning('Large images may affect site performance.'),
}),
    defineField({
      name: 'bio',
      title: 'Bio Text',
      type: 'text',
      rows: 10,
      validation: Rule => Rule.max(2000).warning('Keep it concise for layout clarity'),
      description: 'Line breaks will be preserved. Max ~2000 characters.',
    }),
    defineField({
      name: 'notable_works',
      title: 'Notable Works',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string', title: 'Title' },
            { name: 'url', type: 'url', title: 'YouTube URL' },
          ],
        },
      ],
    }),
    defineField({
  name: 'socials',
  title: 'Social Profiles',
  type: 'object',
  fields: [
    {
      name: 'instagram',
      type: 'object',
      title: 'Instagram',
      fields: [
        { name: 'enabled', type: 'boolean', title: 'Show Instagram', initialValue: true },
        { name: 'url', type: 'url', title: 'Instagram URL' },
      ],
    },
    {
      name: 'imdb',
      type: 'object',
      title: 'IMDb',
      fields: [
        { name: 'enabled', type: 'boolean', title: 'Show IMDb', initialValue: true },
        { name: 'url', type: 'url', title: 'IMDb URL' },
      ],
    },
    {
      name: 'youtube',
      type: 'object',
      title: 'YouTube',
      fields: [
        { name: 'enabled', type: 'boolean', title: 'Show YouTube', initialValue: false },
        { name: 'url', type: 'url', title: 'YouTube URL' },
      ],
    },
  ],
}),
defineField({
  name: 'pronouns',
  type: 'string',
  hidden: true,
}),
defineField({
  name: 'role',
  type: 'string',
  hidden: true,
}),
  ],
  preview: {
  select: {
    title: 'name',
    subtitle: 'roles',
    media: 'headshot',
  },
  prepare({ title, subtitle, media }) {
    return {
      title,
      subtitle: Array.isArray(subtitle) ? subtitle.join(', ') : subtitle,
      media,
    }
  },
},
})
