export default defineNuxtConfig({
  nitro: { preset: 'vercel' },
  routeRules: {
    '/': { prerender: true },        // allow landing
    '/home': { prerender: true },    // allow homepage (optional)
    '/**': { redirect: '/' }         // everything else goes to landing
  },
  nitro: {
    prerender: { routes: ['/', '/home'] } // keep if you want static output for these
  }
})