import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({ name: 'title', type: 'string', title: 'Title' }),
    defineField({ name: 'slug', type: 'slug', title: 'Slug', options: { source: 'title' } }),
    defineField({ name: 'year', type: 'string', title: 'Year' }),
    
    // Cover Image (Full Width)
    defineField({ name: 'coverImage', type: 'image', title: 'Cover Image (Top)', options: { hotspot: true } }),

    // Intro Text
    defineField({ name: 'intro', type: 'text', title: 'Intro Text (Heavy Font)' }),

    defineField({ name: 'thumbnail', type: 'image', title: 'Thumbnail (Portrait)', options: { hotspot: true } }),

    defineField({
      name: 'gallery',
      title: 'Project Content Flow',
      type: 'array',
      of: [
        // Option A/B: Image with layout selection
        { 
          type: 'image', 
          name: 'projectImage',
          title: 'Image',
          options: { hotspot: true },
          fields: [
            {
              name: 'layout',
              type: 'string',
              title: 'Layout Option',
              options: {
                list: [
                  { title: 'Full Width (1 Image)', value: 'full' },
                  { title: 'Half Width (Use 2 in a row)', value: 'half' }
                ],
                layout: 'radio'
              },
              initialValue: 'full'
            },
            { name: 'caption', type: 'string', title: 'Caption' }
          ]
        },
        // Text Block Option
        {
          type: 'object',
          name: 'textBlock',
          title: 'Text Block',
          fields: [
            { name: 'content', type: 'text', title: 'Content' }
          ]
        }
      ]
    }),

    defineField({
      name: 'meta',
      type: 'object',
      title: 'Meta Info',
      fields: [
        {name: 'role', type: 'string'},
        {name: 'client', type: 'string'},
        {name: 'disciplines', type: 'string'}
      ]
    }),
  ]
})