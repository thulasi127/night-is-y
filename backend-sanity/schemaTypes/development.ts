import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'development',
  title: 'IN DEVELOPMENT',
  type: 'document',

  fields: [
    defineField({
      name: 'projects',
      title: 'PROJECTS',
      type: 'array',
      description: 'Add development projects shown on the In Development page.',
      of: [
        {
          type: 'object',
          name: 'project',
          fields: [
            defineField({
              name: 'title',
              title: 'TITLE',
              type: 'string',
              validation: Rule => Rule.required(),
            }),

            defineField({
              name: 'poster',
              title: 'POSTER IMAGE',
              type: 'image',
              options: { hotspot: true },
              description: 'Primary poster image used in carousel and modal.',
              validation: Rule => Rule.required(),
            }),

            defineField({
              name: 'releaseDate',
              title: 'RELEASE DATE',
              type: 'string',
              description: 'e.g. Coming Soon, 2026, In Development',
            }),

            defineField({
              name: 'summary',
              title: 'SUMMARY',
              type: 'text',
              rows: 5,
              description: 'Short project synopsis.',
            }),

            defineField({
              name: 'team',
              title: 'TEAM',
              type: 'array',
              description:
                'Add roles such as Authors, Creators, Producers. Each role can include multiple people.',
              of: [
                {
                  type: 'object',
                  title: 'Role Group',
                  fields: [
                    defineField({
                      name: 'role',
                      title: 'ROLE NAME',
                      type: 'string',
                      validation: Rule => Rule.required(),
                    }),
                    defineField({
                      name: 'names',
                      title: 'PEOPLE',
                      type: 'array',
                      of: [
                        {
                          type: 'object',
                          title: 'Person',
                          fields: [
                            defineField({
                              name: 'name',
                              title: 'FULL NAME',
                              type: 'string',
                              validation: Rule => Rule.required(),
                            }),
                            defineField({
                              name: 'imdb',
                              title: 'IMDB LINK (optional)',
                              type: 'url',
                            }),
                          ],
                        },
                      ],
                    }),
                  ],
                },
              ],
            }),
          ],
        },
      ],
      validation: Rule => Rule.required().min(1),
    }),
  ],

  preview: {
    prepare() {
      return {
        title: 'IN DEVELOPMENT',
        subtitle: 'Edit development projects',
      }
    },
  },
})
