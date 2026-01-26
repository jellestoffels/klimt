import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({ name: 'description', type: 'text', title: 'Home Description' }),
    defineField({ name: 'email', type: 'string', title: 'Contact Email' }),
    defineField({ name: 'socials', type: 'array', of: [{type: 'object', fields: [{name: 'platform', type: 'string'}, {name: 'url', type: 'url'}]}]}),
    defineField({ name: 'location', type: 'string', title: 'Location' }),
  ]
})