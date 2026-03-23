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
      title: 'Project Builder',
      type: 'array',
      description: 'Drag blocks to reorder the page. Each block supports custom width, alignment, offsets, and text sizing.',
      of: [
        {
          type: 'image',
          name: 'projectImage',
          title: 'Legacy Image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'string', title: 'Alt Text' },
            { name: 'caption', type: 'string', title: 'Caption' },
            {
              name: 'layout',
              type: 'string',
              title: 'Preset Layout',
              options: {
                list: [
                  { title: 'Full Width', value: 'full' },
                  { title: 'Half Width', value: 'half' }
                ],
                layout: 'radio'
              },
              initialValue: 'full'
            },
            {
              name: 'align',
              type: 'string',
              title: 'Horizontal Alignment',
              options: {
                list: [
                  { title: 'Left', value: 'left' },
                  { title: 'Center', value: 'center' },
                  { title: 'Right', value: 'right' }
                ],
                layout: 'radio'
              },
              initialValue: 'center'
            },
            {
              name: 'widthPercent',
              type: 'number',
              title: 'Width (%)',
              description: 'Custom block width relative to the content area.',
              initialValue: 100,
              validation: (rule) => rule.min(20).max(100)
            },
            {
              name: 'maxWidth',
              type: 'number',
              title: 'Max Width (px)',
              validation: (rule) => rule.min(200).max(2400)
            },
            {
              name: 'offsetX',
              type: 'number',
              title: 'Horizontal Offset (px)',
              initialValue: 0
            },
            {
              name: 'offsetY',
              type: 'number',
              title: 'Vertical Offset (px)',
              initialValue: 0
            }
          ]
        },
        {
          type: 'object',
          name: 'imageBlock',
          title: 'Image Block',
          fields: [
            { name: 'image', type: 'image', title: 'Image', options: { hotspot: true } },
            { name: 'alt', type: 'string', title: 'Alt Text' },
            { name: 'caption', type: 'string', title: 'Caption' },
            {
              name: 'align',
              type: 'string',
              title: 'Horizontal Alignment',
              options: {
                list: [
                  { title: 'Left', value: 'left' },
                  { title: 'Center', value: 'center' },
                  { title: 'Right', value: 'right' }
                ],
                layout: 'radio'
              },
              initialValue: 'center'
            },
            {
              name: 'widthPercent',
              type: 'number',
              title: 'Width (%)',
              initialValue: 100,
              validation: (rule) => rule.min(20).max(100)
            },
            {
              name: 'maxWidth',
              type: 'number',
              title: 'Max Width (px)',
              validation: (rule) => rule.min(200).max(2400)
            },
            {
              name: 'offsetX',
              type: 'number',
              title: 'Horizontal Offset (px)',
              initialValue: 0
            },
            {
              name: 'offsetY',
              type: 'number',
              title: 'Vertical Offset (px)',
              initialValue: 0
            }
          ]
        },
        {
          type: 'object',
          name: 'videoBlock',
          title: 'Video Block',
          fields: [
            {
              name: 'videoFile',
              type: 'file',
              title: 'Uploaded Video',
              options: { accept: 'video/*' }
            },
            { name: 'videoUrl', type: 'url', title: 'Direct Video URL' },
            { name: 'poster', type: 'image', title: 'Poster Image', options: { hotspot: true } },
            { name: 'caption', type: 'string', title: 'Caption' },
            {
              name: 'align',
              type: 'string',
              title: 'Horizontal Alignment',
              options: {
                list: [
                  { title: 'Left', value: 'left' },
                  { title: 'Center', value: 'center' },
                  { title: 'Right', value: 'right' }
                ],
                layout: 'radio'
              },
              initialValue: 'center'
            },
            {
              name: 'widthPercent',
              type: 'number',
              title: 'Width (%)',
              initialValue: 100,
              validation: (rule) => rule.min(20).max(100)
            },
            {
              name: 'maxWidth',
              type: 'number',
              title: 'Max Width (px)',
              validation: (rule) => rule.min(200).max(2400)
            },
            {
              name: 'offsetX',
              type: 'number',
              title: 'Horizontal Offset (px)',
              initialValue: 0
            },
            {
              name: 'offsetY',
              type: 'number',
              title: 'Vertical Offset (px)',
              initialValue: 0
            },
            { name: 'autoplay', type: 'boolean', title: 'Autoplay', initialValue: true },
            { name: 'loop', type: 'boolean', title: 'Loop', initialValue: true },
            { name: 'muted', type: 'boolean', title: 'Muted', initialValue: true }
          ]
        },
        {
          type: 'object',
          name: 'textBlock',
          title: 'Text Block',
          fields: [
            { name: 'content', type: 'text', title: 'Content' },
            {
              name: 'fontSize',
              type: 'number',
              title: 'Font Size (px)',
              initialValue: 40,
              validation: (rule) => rule.min(14).max(160)
            },
            {
              name: 'maxWidth',
              type: 'number',
              title: 'Max Width (px)',
              initialValue: 960,
              validation: (rule) => rule.min(200).max(2000)
            },
            {
              name: 'align',
              type: 'string',
              title: 'Horizontal Alignment',
              options: {
                list: [
                  { title: 'Left', value: 'left' },
                  { title: 'Center', value: 'center' },
                  { title: 'Right', value: 'right' }
                ],
                layout: 'radio'
              },
              initialValue: 'left'
            },
            {
              name: 'offsetX',
              type: 'number',
              title: 'Horizontal Offset (px)',
              initialValue: 0
            },
            {
              name: 'offsetY',
              type: 'number',
              title: 'Vertical Offset (px)',
              initialValue: 0
            }
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