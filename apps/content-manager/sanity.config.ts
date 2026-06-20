import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import {codeInput} from '@sanity/code-input'
import {portfolioStudioTheme} from './src/theme/theme'
import {structure} from './src/structure'
import {StudioIcon} from './src/theme/studio-icon'
import {resolve} from './src/presentation/resolve'
import {presentationTool} from 'sanity/presentation'
import {schemaTypes} from '@repo/sanity-schema'
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
          // Matches the route handler built in Stage 4: apps/web's
          // /api/draft-mode/enable, which uses next-sanity's
          // defineEnableDraftMode to validate this request and flip
          // on Next.js Draft Mode before redirecting back to the post.
          enable: '/api/draft-mode/enable',
        },
      },
      resolve,
    }),
    codeInput(),
    // Vision lets you run raw GROQ queries against your dataset from
    // inside the Studio — handy for sanity-checking queries while
    // building apps/web's data-fetching code in Stage 4.
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
