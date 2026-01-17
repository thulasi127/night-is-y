import { defineCliConfig } from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'a9t1mosy',
    dataset: 'production',
  },
  deployment: {
    autoUpdates: false,
    appId: 'lemfn41vqk5owgy3v62m4kxl',
  },
})