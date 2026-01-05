import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Heading Title',
      type: 'string',
      initialValue: 'DEVERY JACOBS',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Full Name',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'pronouns',
      title: 'Pronouns',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role / Description',
      type: 'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name: 'headshot',
      title: 'Headshot',
      type: 'image',
      options: { hotspot: true },
      validation: Rule => Rule.required(),
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
      name: 'links',
      title: 'Social Links',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'type', type: 'string', title: 'Platform Type (e.g., imdb, instagram, youtube)' },
            { name: 'url', type: 'url', title: 'URL' },
            { name: 'img', type: 'url', title: 'Icon Image URL (svg/png)' },
          ],
        },
      ],
    }),
  ],
})
