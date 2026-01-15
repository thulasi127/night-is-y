import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'filmSeries',
  title: 'FILM & SERIES PAGE',
  type: 'document',

  fields: [
    defineField({
      name: 'films',
      title: 'FILMS',
      type: 'array',
      description: 'Add and edit films and series shown on the Film & Series page.',
      of: [
        {
          type: 'object',
          name: 'film',
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
              name: 'year',
              title: 'YEAR',
              type: 'number',
              description: 'Release year.',
              validation: Rule =>
                Rule.required().min(1900).max(new Date().getFullYear() + 5),
            }),

            defineField({
  name: 'duration',
  title: 'DURATION',
  type: 'string',
  description: 'e.g. 92 min, 1h 34m, 6 episodes',
  validation: Rule =>
    Rule.custom(value =>
      value && value !== value.toLowerCase()
        ? 'Please use lowercase only'
        : true
    ),
}),

            defineField({
              name: 'description',
              title: 'DESCRIPTION',
              type: 'text',
              rows: 6,
              description: 'Use blank lines to create paragraphs.',
            }),

            defineField({
  name: 'credits',
  title: 'CREDITS',
  type: 'array',
  description:
    'Add roles such as Director, Writers, or Starring. Each role can include multiple people.',
  of: [
    {
      type: 'object',
      title: 'Role Group',
      description: 'A role (e.g. Director) and the people credited under it.',
      fields: [
        defineField({
          name: 'role',
          title: 'ROLE NAME',
          type: 'string',
          description: 'e.g. Director, Writers, Starring',
          validation: Rule => Rule.required(),
        }),
        defineField({
          name: 'people',
          title: 'PEOPLE',
          type: 'array',
          description: 'Add people credited under this role.',
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


            defineField({
              name: 'trailer',
              title: 'TRAILER LINK',
              type: 'url',
              description:
                'Paste the YouTube embed link (https://www.youtube.com/embed/...)',
            }),

            defineField({
              name: 'laurels',
              title: 'LAURELS',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'name',
                      title: 'NAME',
                      type: 'string',
                    }),
                    defineField({
                      name: 'img',
                      title: 'LAUREL IMAGE',
                      type: 'image',
                    }),
                    defineField({
                      name: 'shouldDisplay',
                      title: 'SHOW',
                      type: 'boolean',
                      initialValue: true,
                    }),
                  ],
                },
              ],
            }),

            defineField({
              name: 'awardsAndNominations',
              title: 'AWARDS & NOMINATIONS',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({ name: 'year', title: 'YEAR', type: 'number' }),
                    defineField({
                      name: 'status',
                      title: 'STATUS',
                      type: 'string',
                      options: { list: ['Winner', 'Nominee'] },
                    }),
                    defineField({
                      name: 'award',
                      title: 'AWARD',
                      type: 'string',
                    }),
                    defineField({
                      name: 'category',
                      title: 'CATEGORY',
                      type: 'string',
                    }),
                    defineField({
                      name: 'festival',
                      title: 'FESTIVAL',
                      type: 'string',
                    }),
                    defineField({
                      name: 'notes',
                      title: 'NOTES',
                      type: 'string',
                    }),
                    defineField({
                      name: 'link',
                      title: 'LINK',
                      type: 'url',
                    }),
                  ],
                  preview: {
                    select: {
                      award: 'award',
                      category: 'category',
                      year: 'year',
                      status: 'status',
                    },
                    prepare({ award, category, year, status }) {
                      return {
                        title: award || 'Award',
                        subtitle: `${category || ''} · ${year || ''} ${status || ''}`,
                      }
                    },
                  },
                },
              ],
            }),

            defineField({
              name: 'articles',
              title: 'ARTICLES',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    defineField({
                      name: 'title',
                      title: 'TITLE',
                      type: 'string',
                      validation: Rule => Rule.required(),
                    }),
                    defineField({
                      name: 'link',
                      title: 'LINK',
                      type: 'url',
                      validation: Rule => Rule.required(),
                    }),
                  ],
                  preview: {
                    select: {
                      title: 'title',
                      link: 'link',
                    },
                    prepare({ title, link }) {
                      return {
                        title,
                        subtitle: link,
                      }
                    },
                  },
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
        title: 'Film & Series',
        subtitle: 'Edit films and series shown on the site',
      }
    },
  },
})
