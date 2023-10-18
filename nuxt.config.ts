export default defineNuxtConfig({
  modules: [
    [
      '@nuxtjs/google-fonts',
      {
        families: {
          Nunito: [200, 300, 400, 500, 600, 700],
        },
      },
    ],
    'nuxt-icon',
  ],
  devtools: { enabled: true },
  css: ['@/assets/scss/global.scss'],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "@/assets/scss/main.scss" as *;',
        },
      },
    },
  },
});
