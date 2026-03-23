import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    // 1. Global SEO / Meta & Home Content
    defineField({ 
      name: 'description', 
      type: 'text', 
      title: 'Home Description (Short Text)', 
      description: 'The short text displayed on the home page.',
      rows: 3
    }),
    
    defineField({
      name: 'homeImage',
      type: 'image',
      title: 'Home Page Center Image',
      description: 'The main image displayed in the center of the home page.',
      options: { hotspot: true }
    }),

    // 2. Branding (Logos)
    defineField({
      name: 'headerLogo',
      type: 'image',
      title: 'Header Logo',
      description: 'Upload a black SVG or transparent PNG. It will automatically invert to white on dark pages.',
      options: { hotspot: true }
    }),
    defineField({
      name: 'footerLogo',
      type: 'image',
      title: 'Footer Logotype (Contact Page)',
      description: 'The large decorative logo at the bottom of the contact page.',
      options: { hotspot: true }
    }),
    defineField({
      name: 'transitionLogo',
      type: 'image',
      title: 'Page Transition Logo',
      description: 'Upload the Dice mark used in the center of the page transition overlay.',
      options: { hotspot: true }
    }),

    // 3. Text Labels
    defineField({
      name: 'projectsLabel',
      type: 'string',
      title: 'Projects Page Label',
      initialValue: 'Selected Projects',
      description: 'The text displayed above the grid on the Projects page.'
    }),

    // 4. Contact Details
    defineField({ name: 'email', type: 'string', title: 'Contact Email' }),
    defineField({
      name: 'websiteUrl',
      type: 'url',
      title: 'Website URL'
    }),
    defineField({
      name: 'contactBio',
      type: 'text',
      title: 'Contact Page Bio',
      rows: 4
    }),
    defineField({
      name: 'contactCardImage',
      type: 'image',
      title: 'Contact Page Card Image',
      options: { hotspot: true }
    }),
    defineField({ 
      name: 'socials', 
      type: 'array', 
      title: 'Social Links',
      of: [{
        type: 'object', 
        fields: [
          {name: 'platform', type: 'string', title: 'Platform Name (e.g. Instagram)'}, 
          {name: 'url', type: 'url', title: 'URL'}
        ]
      }]
    }),
    defineField({
      name: 'offices',
      type: 'array',
      title: 'Office Locations',
      of: [{
        type: 'object',
        fields: [
          { name: 'city', type: 'string', title: 'City' },
          { name: 'detail', type: 'string', title: 'Detail' }
        ]
      }]
    }),
    defineField({ name: 'location', type: 'string', title: 'Location' }),
    defineField({ name: 'availability', type: 'string', title: 'Availability' }),
  ]
})