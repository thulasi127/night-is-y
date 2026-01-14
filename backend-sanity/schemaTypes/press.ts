// sanity/schemaTypes/press.ts
export default {
  name: 'press',
  title: 'PRESS PAGE',
  type: 'document',

  fields: [
    {
      name: 'projects',
      title: 'Projects',
      description:
        'Add press quotes grouped by project. Each project can include multiple quotes from different publications.',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Project',
          fields: [
            {
              name: 'project',
              title: 'Project Title',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
              description:
                'The name of the project this press coverage relates to (for example, a film or series title).',
            },

            {
              name: 'quotes',
              title: 'Press Quotes',
              description:
                'Add individual press quotes for this project. Each quote should come from a publication or outlet.',
              type: 'array',
              of: [
                {
                  type: 'object',
                  title: 'Quote',
                  fields: [
                    {
                      name: 'text',
                      title: 'Quote Text',
                      type: 'text',
                      rows: 3,
                      validation: (Rule: any) => Rule.required(),
                      description:
                        'Paste the exact quote from the publication.\n\nPlease note: Quotation marks are added automatically on the website.',
                    },
                    {
                      name: 'source',
                      title: 'Publication',
                      type: 'string',
                      description:
                        'The name of the publication or outlet the quote is from (for example, Variety or The New York Times).',
                    },
                    {
                      name: 'logo',
                      title: 'Publication Logo',
                      type: 'image',
                      options: {
                        accept: 'image/svg+xml,image/png',
                      },
                      description:
                        'Upload the publication’s logo. SVG or PNG formats work best.',
                    },
                    {
                      name: 'invertDarkLogo',
                      title: 'Invert Logo for Dark Background',
                      type: 'boolean',
                      initialValue: false,
                      description:
                        'Enable this if the logo is dark and needs to be inverted to display clearly on a dark background.',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],

  preview: {
    prepare() {
      return {
        title: 'Press Quotes',
        subtitle: 'Press content for the site',
      }
    },
  },
}
