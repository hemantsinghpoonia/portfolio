import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {codeInput} from '@sanity/code-input'
import {portfolioStudioTheme} from './src/theme/theme'
import {structure} from './src/structure'
import {StudioIcon} from './src/theme/studio-icon'
import {resolve} from './src/presentation/resolve'
import {presentationTool} from 'sanity/presentation'
import {schemaTypes} from '@repo/sanity-schema/schema'
import './src/theme/studio.css'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID!
const dataset = process.env.SANITY_STUDIO_DATASET!
const previewUrl = process.env.SANITY_STUDIO_PREVIEW_URL

export default defineConfig({
  name: 'default',
  title: 'content-manager',
  icon: StudioIcon,
  projectId,
  dataset,

  theme: portfolioStudioTheme,

  plugins: [
    structureTool({structure}),
    presentationTool({
      previewUrl: {
        origin: previewUrl,
        previewMode: {
          enable: '/api/draft-mode/enable',
        },
      },
      resolve,
    }),
    codeInput(),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
