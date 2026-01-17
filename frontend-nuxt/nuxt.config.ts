export default defineNuxtConfig({
  runtimeConfig: {
    public: {
      sanityProjectId: process.env.SANITY_PROJECT_ID,
      sanityDataset: process.env.SANITY_DATASET,
      sanityApiVersion: process.env.SANITY_API_VERSION || '2023-03-01',
      sanityUseCdn: process.env.SANITY_USE_CDN !== 'false',
    },
  },
  devServer: {
    quiet: true,
  },
  vite: {
    logLevel: 'error',
  },
  css: [
    '~/assets/css/global.css',       // your base styles
    '~/assets/css/main.css',         // general site-wide styles
    '~/assets/css/responsive.css',   // all @media breakpoints
    '~/assets/css/scroll-fix.css'    // any scroll-related fixes
  ],
  compatibilityDate: '2025-09-03',

  app: {
    pageTransition: { name: 'fade-fast', mode: 'out-in' },
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: '/Image/NIY-logos/niy-logo-3.png'
        },
        {
          rel: 'stylesheet',
          href: 'https://use.typekit.net/lmr4fnt.css'
        }
      ]
    }
  }
})
