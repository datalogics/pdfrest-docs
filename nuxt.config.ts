import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const currentDir = dirname(fileURLToPath(import.meta.url));

export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    '@nuxtjs/tailwindcss',
    'shadcn-nuxt',
    '@vueuse/nuxt',
    '@nuxt/content',
    '@nuxthq/studio',
    '@nuxt/image',
    '@nuxt/icon',
    '@nuxtjs/color-mode',
    'nuxt-og-image',
    '@nuxt/scripts',
    '@nuxtjs/robots',
  ],
  shadcn: {
    prefix: 'Ui',
    componentDir: join(currentDir, './components/ui'),
  },
  components: {
    dirs: [
      {
        path: './components',
        ignore: ['**/*.ts'],
      },
    ],
  },
  colorMode: {
    classSuffix: '',
    disableTransition: true,
  },
  css: [
    join(currentDir, './assets/css/themes.css'),
  ],
  content: {
    preview: {
      api: 'https://api.nuxt.studio',
      gitInfo: {
        name: 'pdfrest-docs',
        owner: 'pdfrest',
        url: 'https://github.com/pdfrest/pdfrest-docs',
      },
    },
    documentDriven: true,
    highlight: {
      theme: {
        default: 'github-light',
        dark: 'github-dark',
      },
      preload: ['json', 'js', 'ts', 'html', 'css', 'vue', 'diff', 'shell', 'markdown', 'mdc', 'yaml', 'bash', 'ini', 'dotenv'],
    },
    navigation: {
      fields: [
        'icon',
        'navBadges',
        'navTruncate',
        'badges',
        'toc',
        'sidebar',
        'collapse',
        'editLink',
        'prevNext',
        'breadcrumb',
      ],
    },
    experimental: {
      search: {
        indexed: true,
      },
    },
  },
  experimental: {
    defaults: {
      // https://github.com/nuxt/nuxt/pull/23724
      nuxtLink: {
        trailingSlash: 'append',
      },
    },
  },
  icon: {
    clientBundle: {
      scan: true,
      sizeLimitKb: 512,
    },
    customCollections: [
      {
        prefix: 'pdfrest',
        dir: './public/self-hosted-product-icons',
      },
    ],
  },
  typescript: {
    tsConfig: {
      compilerOptions: {
        baseUrl: '.',
      },
    },
  },
  build: {
    transpile: ['shiki'],
  },
  routeRules: {
    '/self-hosted-api-on-aws/getting-started/': { redirect: '/pdfrest-api-toolkit-on-aws/getting-started/' },
    '/self-hosted-api-on-aws/configure-aws-deployment/': { redirect: '/pdfrest-api-toolkit-on-aws/configure-aws-deployment/' },
    '/self-hosted-api-on-aws/deploy-on-aws/': { redirect: '/pdfrest-api-toolkit-on-aws/deploy-on-aws/' },
    '/self-hosted-api-on-aws/faq/': { redirect: '/pdfrest-api-toolkit-on-aws/faq/' },

    '/cloud-api/frequently-asked-questions/': { redirect: '/pdfrest-api-toolkit-cloud/frequently-asked-questions/' },
    '/cloud-api/getting-started/': { redirect: '/pdfrest-api-toolkit-cloud/getting-started/' },

    '/container-api-with-docker/getting-started/': { redirect: '/pdfrest-api-toolkit-container/getting-started/' },
    '/container-api-with-docker/configure-container-api/': { redirect: '/pdfrest-api-toolkit-container/configure-container-api/' },
    '/container-api-with-docker/deploy-container-api/': { redirect: '/pdfrest-api-toolkit-container/deploy-container-api/' },

    '/cloud-api-reference/': { redirect: '/pdfrest-api-toolkit-cloud/api-reference-guide/' },
    '/pdf-forms-pro-self-hosted-reference/': { redirect: '/pdfrest-api-toolkit-container/api-reference-guide/' },
    '/pdf-to-office-pro-self-hosted-reference/': { redirect: '/pdfrest-api-toolkit-container/api-reference-guide/' },
    '/pdf-toolkit-self-hosted-reference/': { redirect: '/pdfrest-api-toolkit-container/api-reference-guide/' },
  },
  nitro: { prerender: { ignore: ['/pdfrest-api-toolkit-cloud/api-reference-guide/', '/pdfrest-api-toolkit-container/api-reference-guide/'] } },
  compatibilityDate: '2024-07-05',
});
