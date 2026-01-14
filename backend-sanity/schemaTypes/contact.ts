export default {
  name: 'contact',
  title: 'Contact',
  type: 'document',

  fields: [
    {
      name: 'people',
      title: 'Contacts',
      description:
        'Add contact information for each team member. Each person can have multiple contacts (for example, manager and publicist).',
      type: 'array',
      of: [
        {
          type: 'object',
          title: 'Person',
          fields: [
            {
              name: 'name',
              title: 'Name',
              type: 'string',
              validation: (Rule: any) => Rule.required(),
              description:
                'Full name of the team member (for example, Devery Jacobs or D.W. Waterson).',
            },

            {
              name: 'entries',
              title: 'Contact Entries',
              description:
                'Add one or more contacts for this person (for example, manager or publicist).',
              type: 'array',
              of: [
                {
                  type: 'object',
                  title: 'Contact',
                  fields: [
                    {
                      name: 'role',
                      title: 'Role',
                      type: 'string',
                      description:
                        'The role or relationship (for example, Manager or Publicist).',
                    },
                    {
                      name: 'name',
                      title: 'Contact Name',
                      type: 'string',
                      description:
                        'Name of the contact person.',
                    },
                    {
                      name: 'email',
                      title: 'Email Address',
                      type: 'string',
                      description:
                        'Email address for this contact.',
                      validation: (Rule: any) =>
                        Rule.required().email(),
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
        title: 'Contact Page',
        subtitle: 'Manage contact information for each team member',
      }
    },
  },
}
