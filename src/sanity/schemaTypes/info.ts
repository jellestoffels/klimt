import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'info',
  title: 'Info Page',
  type: 'document',
  fields: [
    defineField({ name: 'headline', type: 'string', title: 'Intro Headline' }),
    defineField({ name: 'intro', type: 'text', title: 'Intro Paragraph' }),
    defineField({ 
      name: 'services', 
      type: 'array', 
      title: 'Services List',
      of: [{
        type: 'object',
        fields: [
          {name: 'group', type: 'string', title: 'Group Label'},
          {name: 'items', type: 'array', of: [{type: 'string'}], title: 'Items'}
        ]
      }]
    }),
    defineField({ name: 'clients', type: 'array', of: [{type: 'string'}], title: 'Client List' }),
    defineField({ name: 'portrait', type: 'image', title: 'Portrait' })
  ]
})