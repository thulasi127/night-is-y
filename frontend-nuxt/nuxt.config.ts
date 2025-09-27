export default defineNuxtConfig({
  css: [
    '~/assets/css/global.css',       // your base styles
    '~/assets/css/main.css',         // general site-wide styles
    '~/assets/css/responsive.css',   // all @media breakpoints
    '~/assets/css/scroll-fix.css'    // any scroll-related fixes
  ],
  compatibilityDate: '2025-09-03',

  app: {
    head: {
      meta: [
        { name: 'viewport', content: 'width=device-width, initial-scale=1.0' }
      ],
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: '/Image/NIY-logos/niy-logo-2-white-bg.png'
        },
        {
          rel: 'stylesheet',
          href: 'https://use.typekit.net/lmr4fnt.css'
        }
      ]
    }
  }
})
