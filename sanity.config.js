import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { schema } from './sanity/schema'

const config = defineConfig({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: 'production',
  title: 'Studio Klimt CMS',
  apiVersion: '2024-01-22',
  basePath: '/studio',
  plugins: [structureTool()],
  schema: schema,
})

export default config