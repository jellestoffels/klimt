import { defineField, defineType } from 'sanity'
import ProjectGridInput from '../components/ProjectGridInput'

const placementFields = [
  defineField({
    name: 'columnStart',
    type: 'number',
    title: 'Column Start',
    initialValue: 1,
    validation: (rule) => rule.min(1).max(24),
  }),
  defineField({
    name: 'columnSpan',
    type: 'number',
    title: 'Column Span',
    initialValue: 6,
    validation: (rule) => rule.min(1).max(24),
  }),
  defineField({
    name: 'rowStart',
    type: 'number',
    title: 'Row Start',
    initialValue: 1,
    validation: (rule) => rule.min(1).max(48),
  }),
  defineField({
    name: 'rowSpan',
    type: 'number',
    title: 'Row Span',
    initialValue: 4,
    validation: (rule) => rule.min(1).max(48),
  }),
]

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
      name: 'layoutColumns',
      type: 'number',
      title: 'Grid Columns',
      initialValue: 12,
      validation: (rule) => rule.min(1).max(24),
    }),
    defineField({
      name: 'layoutRows',
      type: 'number',
      title: 'Grid Rows',
      initialValue: 18,
      validation: (rule) => rule.min(1).max(60),
    }),
    defineField({
      name: 'layoutRowHeight',
      type: 'number',
      title: 'Row Height (px)',
      initialValue: 80,
      validation: (rule) => rule.min(20).max(300),
    }),
    defineField({
      name: 'layoutGap',
      type: 'number',
      title: 'Grid Gap (px)',
      initialValue: 20,
      validation: (rule) => rule.min(0).max(120),
    }),

    defineField({
      name: 'gallery',
      title: 'Project Grid Builder',
      type: 'array',
      description: 'Add blocks below, then place them visually in the grid canvas. You control rows, columns, size, and position.',
      components: {
        input: ProjectGridInput,
      },
      of: [
        {
          type: 'image',
          name: 'projectImage',
          title: 'Legacy Image',
          options: { hotspot: true },
          fields: [
            { name: 'alt', type: 'string', title: 'Alt Text' },
            { name: 'caption', type: 'string', title: 'Caption' },
            ...placementFields,
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
            ...placementFields,
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
            ...placementFields,
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
            ...placementFields,
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