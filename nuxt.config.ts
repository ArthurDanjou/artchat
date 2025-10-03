import { definePerson } from 'nuxt-schema-org/schema'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-20',

  // Nuxt App
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    head: {
      templateParams: {
        separator: '•',
      },
    },
    rootAttrs: {
      class: 'bg-[var(--ui-bg)]',
    },
  },

  css: ['~/assets/css/main.css'],

  // Nuxt Modules
  modules: [
    '@nuxt/ui',
    '@nuxtjs/seo',
    '@nuxt/content',
    '@vueuse/nuxt',
    '@nuxtjs/google-fonts',
    '@nuxt/image',
    '@vueuse/motion/nuxt',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
  ],

  ogImage: {
    enabled: false,
  },
  linkChecker: {
    enabled: false,
  },

  site: {
    url: 'https://arthurdanjou.fr',
    name: 'Developer enjoying Artificial Intelligence and Machine Learning. Mathematics Student at Paris Dauphine-PSL University specialised in Statistics and Data Science.',
  },

  schemaOrg: {
    identity: definePerson({
      // Basic Information, if applicable
      name: 'Arthur Danjou',
      givenName: 'Arthur',
      familyName: 'Danjou',

      // Profile Information, if applicable
      image: '/arthur-pro.webp',
      description: 'AI researcher and technical author specializing in machine learning and neural networks',
      jobTitle: 'Principal AI Researcher',

      // Contact & Social, if applicable
      email: 'arthurdanjou@outlook.fr',
      url: 'https://go.arthurdanjou.fr/website',
      sameAs: [
        'https://go.arthurdanjou.fr/twitter',
        'https://go.arthurdanjou.fr/github',
        'https://go.arthurdanjou.fr/linkedin',
      ],
    }),
  },

  // Nuxt Content
  content: {
    preview: {
      api: 'https://api.nuxt.studio',
    },
    build: {
      markdown: {
        highlight: {
          langs: ['json', 'js', 'ts', 'html', 'css', 'vue', 'shell', 'mdc', 'md', 'yaml', 'python', 'ts', 'javascript', 'r'],
          theme: 'github-dark',
        },
        remarkPlugins: {
          'remark-math': {},
        },
        rehypePlugins: {
          'rehype-katex': {
            output: 'mathml',
          },
        },
      },
    },
  },

  vite: {
    build: {
      sourcemap: false,
    },
  },

  // Nuxt Color Mode
  colorMode: {
    preference: 'system',
    fallback: 'light',
  },

  // Nuxt Devtools
  devtools: {
    enabled: true,
    timeline: { enabled: true },
  },

  // Nuxt I18N
  i18n: {
    strategy: 'no_prefix',
    locales: [
      {
        label: 'English',
        code: 'en',
        language: 'en-EN',
        icon: 'i-twemoji-flag-united-kingdom',
        file: 'en.json',
      },
      {
        label: 'Français',
        code: 'fr',
        language: 'fr-FR',
        icon: 'i-twemoji-flag-france',
        file: 'fr.json',
      },
      {
        label: 'Español',
        code: 'es',
        language: 'es-ES',
        icon: 'i-twemoji-flag-spain',
        file: 'es.json',
      },
    ],
    defaultLocale: 'en',
    langDir: 'locales',
    restructureDir: '',
  },

  // Nuxt Google Fonts
  googleFonts: {
    display: 'swap',
    families: {
      'Inter': [400, 500, 600, 700, 800, 900],
      'Sofia Sans': [400],
      'DM Sans': [400, 500, 600, 700, 800, 900],
      'Dancing Script': [400, 700],
    },
  },

  // Nitro
  nitro: {
    experimental: {
      openAPI: true,
    },
    preset: 'cloudflare-module',
    cloudflare: {
      deployConfig: true,
      nodeCompat: true,
    },
  },

  // Nuxt Env
  runtimeConfig: {
    discord: {
      userId: '',
      id: '',
      token: '',
    },
    wakatime: {
      userId: '',
      coding: '',
      editors: '',
      languages: '',
      os: '',
    },
    openWeather: {
      apiKey: '',
    },
    public: {
      i18n: {
        baseUrl: '',
      },
    },
  },
})
