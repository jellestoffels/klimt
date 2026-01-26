import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    // 1. Global SEO / Meta
    defineField({ 
      name: 'description', 
      type: 'text', 
      title: 'Home Description',
      description: 'The short intro text on the home page.' 
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
    defineField({ name: 'location', type: 'string', title: 'Location' }),
    defineField({ name: 'availability', type: 'string', title: 'Availability' }),
  ]
})