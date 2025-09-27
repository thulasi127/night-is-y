export default defineNuxtConfig({
  css: ['~/assets/css/global.css', '~/assets/css/scroll-fix.css'],
  compatibilityDate: '2025-09-03',

  app: {
    head: {
      link: [
        {
          rel: 'icon',
          type: 'image/png',
          href: '/Image/NIY-logos/niy-logo-1.png'
        },
        {
          rel: 'stylesheet',
          href: 'https://use.typekit.net/lmr4fnt.css'
        }
      ]
    }
  }
})
