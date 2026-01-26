import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'string',
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'string'}]
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail',
      type: 'image',
      options: { hotspot: true }
    }),
    defineField({
      name: 'meta',
      title: 'Project Meta',
      type: 'object',
      fields: [
        {name: 'role', type: 'string', title: 'Role'},
        {name: 'disciplines', type: 'string', title: 'Disciplines'},
        {name: 'client', type: 'string', title: 'Client (Text Only)'},
      ]
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
    }),
  defineField({
      name: 'gallery',
      title: 'Media Gallery',
      type: 'array',
      of: [
        // 1. Images
        { type: 'image', options: { hotspot: true }, fields: [
           {name: 'caption', type: 'string', title: 'Caption'}
        ]},
        // 2. NEW: Videos (Standard file upload)
        { type: 'file', name: 'video', title: 'Video File', fields: [
           {name: 'caption', type: 'string', title: 'Caption'}
        ]},
        // 3. Text Sections
        { type: 'object', name: 'textSection', title: 'Text Section', fields: [
           {name: 'heading', type: 'string', title: 'Heading'},
           {name: 'body', type: 'text', title: 'Body'}
        ]}
      ]
    })
  ]
})