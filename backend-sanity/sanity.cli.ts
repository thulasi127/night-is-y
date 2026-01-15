import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: 'a9t1mosy',
    dataset: 'production',
  },
  deployment: {
    autoUpdates: false,
  },
})