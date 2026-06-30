import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: process.env.SANITY_STUDIO_PROJECT_ID,
    dataset: process.env.SANITY_STUDIO_DATASET,
  },
  deployment: {
    autoUpdates: false,
    appId: process.env.SANITY_STUDIO_APP_ID,
  },
  vite: (config) => ({
    ...config,
    optimizeDeps: {
      ...config.optimizeDeps,
      esbuildOptions: {
        ...config.optimizeDeps?.esbuildOptions,
        loader: {
          ...config.optimizeDeps?.esbuildOptions?.loader,
          '.js': 'jsx',
        },
      },
    },
  }),
})
