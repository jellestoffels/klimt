import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'info',
  title: 'Info Page',
  type: 'document',
  fields: [
    // 1. Intro
    defineField({ name: 'headline', type: 'string', title: 'Big Headline' }),
    defineField({ name: 'intro', type: 'text', title: 'Intro Paragraph' }),

    // 2. Disciplines (The 4 columns: Brand, Visual, etc)
    defineField({
      name: 'disciplines',
      type: 'array',
      title: 'Disciplines List',
      of: [{
        type: 'object',
        fields: [
          { name: 'category', type: 'string', title: 'Category Name (e.g. Brand)' },
          { name: 'items', type: 'array', of: [{ type: 'string' }], title: 'Services List' }
        ]
      }]
    }),

    // 3. Client Logos
    defineField({
      name: 'clients',
      type: 'array',
      title: 'Client Logos',
      of: [{ 
        type: 'image',
        options: { hotspot: true },
        fields: [{ name: 'name', type: 'string', title: 'Client Name' }] 
      }]
    }),
    
    // 4. Team (Optional based on screenshot, adding just in case)
    defineField({
      name: 'team',
      type: 'array',
      title: 'Team Members',
      of: [{
        type: 'object',
        fields: [
          { name: 'name', type: 'string' },
          { name: 'role', type: 'string' },
          { name: 'image', type: 'image' }
        ]
      }]
    })
  ]
})