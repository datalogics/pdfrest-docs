export default defineAppConfig({
  shadcnDocs: {
    site: {
      name: 'pdfRest Documentation',
      description: 'Learn how to setup and use pdfRest.',
      ogImage: '/hero.png',
      ogImageComponent: 'ShadcnDocs',
      ogImageColor: 'dark',
    },
    theme: {
      color: 'pdfrest',
      radius: 0.75,
    },
    banner: {
      enable: false,
      showClose: true,
      content: 'Welcome to **pdfRest Documentation**',
      to: 'https://github.com/datalogics/pdf-rest-api-samples',
      target: '_blank',
      border: true,
    },
    header: {
      title: 'Documentation',
      showTitle: true,
      logo: {
        light: '/logo.svg',
        dark: '/logo-dark.svg',
      },
      darkModeToggle: true,
      nav: [{
        title: 'pdfRest Home',
        to: 'https://pdfrest.com/',
        target: '_blank',
        showLinkIcon: true,
      }, {
        title: 'Resources',
        links: [{
          title: 'API Lab',
          to: 'https://pdfrest.com/apilab/',
          description: 'Customize options, autogenerate code, and process files with pdfRest instantly online.',
          target: '_blank',
          icon: 'pdfrest:api-lab',
        }, {
          title: 'GitHub',
          to: 'https://github.com/datalogics/pdf-rest-api-samples',
          description: 'Dozens of code samples in JavaScript, Python, PHP, cURL, and more.',
          target: '_blank',
          icon: 'mdi:github',
        }, {
          title: 'Postman',
          to: 'https://www.postman.com/pdfrest/',
          description: 'Send preconfigured pdfRest API Calls through the simple Postman interface.',
          target: '_blank',
          icon: 'vscode-icons:file-type-postman',
        }, {
          title: 'Status',
          to: 'https://status.pdfrest.com/',
          description: 'Check the status of pdfRest.',
          target: '_blank',
          icon: 'pajamas:status-health',
        }],
      }, {
        title: 'Support',
        to: 'https://pdfrest.com/support/',
        target: '_blank',
        showLinkIcon: true,
      }],
      links: [],
    },
    aside: {
      useLevel: true,
      collapse: false,
      collapseLevel: 1,
      folderStyle: 'default',
    },
    main: {
      breadCrumb: true,
      showTitle: true,
      codeCopyToast: true,
      backToTop: true,
      codeIcon: {
        'package.json': 'vscode-icons:file-type-node',
        'tsconfig.json': 'vscode-icons:file-type-tsconfig',
        '.npmrc': 'vscode-icons:file-type-npm',
        '.editorconfig': 'vscode-icons:file-type-editorconfig',
        '.eslintrc': 'vscode-icons:file-type-eslint',
        '.eslintrc.cjs': 'vscode-icons:file-type-eslint',
        '.eslintignore': 'vscode-icons:file-type-eslint',
        'eslint.config.js': 'vscode-icons:file-type-eslint',
        'eslint.config.mjs': 'vscode-icons:file-type-eslint',
        'eslint.config.cjs': 'vscode-icons:file-type-eslint',
        '.gitignore': 'vscode-icons:file-type-git',
        'yarn.lock': 'vscode-icons:file-type-yarn',
        '.env': 'vscode-icons:file-type-dotenv',
        '.env.example': 'vscode-icons:file-type-dotenv',
        '.vscode/settings.json': 'vscode-icons:file-type-vscode',
        'nuxt': 'vscode-icons:file-type-nuxt',
        '.nuxtrc': 'vscode-icons:file-type-nuxt',
        '.nuxtignore': 'vscode-icons:file-type-nuxt',
        'nuxt.config.js': 'vscode-icons:file-type-nuxt',
        'nuxt.config.ts': 'vscode-icons:file-type-nuxt',
        'nuxt.schema.ts': 'vscode-icons:file-type-nuxt',
        'tailwind.config.js': 'vscode-icons:file-type-tailwind',
        'tailwind.config.ts': 'vscode-icons:file-type-tailwind',
        'vue': 'vscode-icons:file-type-vue',
        'ts': 'vscode-icons:file-type-typescript',
        'tsx': 'vscode-icons:file-type-typescript',
        'mjs': 'vscode-icons:file-type-js',
        'cjs': 'vscode-icons:file-type-js',
        'js': 'vscode-icons:file-type-js',
        'jsx': 'vscode-icons:file-type-js',
        'md': 'vscode-icons:file-type-markdown',
        'mdc': 'vscode-icons:file-type-markdown',
        'py': 'vscode-icons:file-type-python',
        'npm': 'vscode-icons:file-type-npm',
        'pnpm': 'vscode-icons:file-type-pnpm',
        'npx': 'vscode-icons:file-type-npm',
        'yarn': 'vscode-icons:file-type-yarn',
        'bun': 'vscode-icons:file-type-bun',
        'yml': 'vscode-icons:file-type-yaml',
        'json': 'vscode-icons:file-type-json',
        'terminal': 'lucide:terminal',
      },
    },
    footer: {
      credits: `© ${new Date().getFullYear()} Datalogics, Inc. All rights reserved.`,
      links: [
        {
          title: 'Acknowledgements',
          to: '/additional-guides/acknowledgements/',
        },
      ],
    },
    toc: {
      enable: true,
      enableInMobile: false,
      enableInHomepage: true,
      title: 'On This Page',
      // links: [{
      //   title: 'Star on GitHub',
      //   icon: 'lucide:star',
      //   to: 'https://github.com/ZTL-UwU/shadcn-docs-nuxt',
      //   target: '_blank',
      //   showLinkIcon: true,
      // }, {
      //   title: 'Create Issues',
      //   icon: 'lucide:circle-dot',
      //   to: 'https://github.com/ZTL-UwU/shadcn-docs-nuxt/issues',
      //   target: '_blank',
      //   showLinkIcon: true,
      // }],
    },
    search: {
      enable: true,
      inAside: false,
    },
  },
});
