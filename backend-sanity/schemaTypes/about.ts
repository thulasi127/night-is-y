// backend-sanity/schemaTypes/about.ts
import { defineType, defineField } from 'sanity'
import CharacterCountTextInput from '../components/CharacterCountTextInput'

export default defineType({
  name: 'about',
  title: 'ABOUT PAGE',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      initialValue: 'About Page',
      readOnly: true,
      hidden: true,
    }),
    defineField({
        name: 'bio',
        title: 'NIY Bio',
        type: 'text',
        components: {
            input: CharacterCountTextInput,
        },
        rows: 6,
        description: 'Write a short bio for Night is Y (max: 160 words / 1000 characters)',
        validation: Rule =>
            Rule.max(1000).error('Bio must be under 1000 characters to avoid layout issues.'),
        }),
  ],
})
