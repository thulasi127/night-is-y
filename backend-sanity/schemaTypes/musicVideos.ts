import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'musicVideos',
  title: 'MUSIC VIDEOS PAGE',
  type: 'document',

  fields: [
    defineField({
      name: 'videos',
      title: 'VIDEOS',
      type: 'array',
      description: 'Music videos shown on the Music Videos page.',
      of: [
        {
          type: 'object',
          title: 'Music Video',
          fields: [
            defineField({
              name: 'title',
              title: 'TITLE',
              type: 'string',
              validation: Rule => Rule.required(),
            }),

            defineField({
              name: 'artist',
              title: 'ARTIST',
              type: 'string',
              validation: Rule => Rule.required(),
            }),

            defineField({
              name: 'poster',
              title: 'POSTER IMAGE',
              type: 'image',
              options: { hotspot: true },
              validation: Rule => Rule.required(),
            }),

            defineField({
              name: 'youtubeUrl',
              title: 'YOUTUBE EMBED LINK',
              type: 'url',
              description:
                'Use the embed URL (https://www.youtube.com/embed/...)',
              validation: Rule => Rule.required(),
            }),
          ],
          preview: {
            select: {
              title: 'title',
              artist: 'artist',
              media: 'poster',
            },
            prepare({ title, artist, media }) {
              return {
                title,
                subtitle: artist,
                media,
              }
            },
          },
        },
      ],
      validation: Rule => Rule.required().min(1),
    }),
  ],

  preview: {
    prepare() {
      return {
        title: 'Music Videos',
        subtitle: 'Edit music videos shown on the site',
      }
    },
  },
})
