// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import {themes as prismThemes} from 'prism-react-renderer';

/** @type {import('@docusaurus/types').Config} */
const config = {
  markdown: {
    preprocessor: ({filePath, fileContent}) => {
      // The regex extracts a version number that is being used as a part of
      // directory name. The assumption is that versions numbers are
      // '/n.n.n/' format. There must be at least one number.
      // Valid examples: /1/ /1.1/, /123.456.789/, /1.2.3.4.5.6/
      // Invalid: /1.2-dev/, /1.2rc3/
      // Trying to keep it simple for our use case in Longhorn.
      const regex = /\/version-(?<vno>(?:[0-9]{1,}\.{0,1})*)\//gm;
      var fp = filePath;
      var fc = fileContent;
      var cCV = '1.7.0';
      for (const match of fp.matchAll(regex)) {
        fc = fc.replace(/{{< current-version >}}/g, `${match.groups.vno}`);
      }
      // The next line ensures that any use of {{< current-version >}}
      // outside a versioned directory will be replaced with the default
      // cCV (currentCurrentVersion). If the next line is commented out then
      // the build fails if it finds any such. Which might be what you
      // need.
      fc = fc.replace(/{{< current-version >}}/g, cCV);
      // The filepath is only used as an aid to see which file was being
      // processed.
      // fc = fc.replace(/lhv_fp_lhv/g, fp);
      return fc;
    },
  },
  title: 'Longhorn',
  tagline: 'Longhorn is a lightweight, reliable, and powerful distributed block storage system for Kubernetes.',
  favicon: 'img/favicon.ico',

  // Set the production url of your site here
  url: 'https://longhorn.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'longhorn', // Usually your GitHub org/user name.
  projectName: 'website', // Usually your repo name.

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: './sidebars.js',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/longhorn/website/content/docs',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/longhorn/website/content/blog/',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      docs: {
        sidebar: {
          hideable: true,
          autoCollapseCategories: true,
        },
      },
      navbar: {
        title: 'Longhorn',
        logo: {
          alt: 'Longhorn Logo',
          src: 'img/logo.svg',
        },
        items: [
          {
            type: "docsVersionDropdown",
            position: "left",
            dropdownActiveClassDisabled: true,
          },
          {
            href: "blog",
            label: "Blog",
            position: "left",
          },
          {
            href: "kb",
            label: "Knowledge Base",
            position: "left",
          },
          /*{
            type: "search",
            position: "left",
          },*/
          {
            href: "https://github.com/longhorn",
            label: "GitHub",
            position: "right",
          },
          {
            type: "dropdown",
            label: "Community",
            position: "right",
            items: [
              {
                label: "Slack",
                href: "https://cloud-native.slack.com/messages/longhorn",
              },
            ],
          },
        ],
      },
      footer: {
        style: 'dark',
        copyright: `Copyright © ${new Date().getFullYear()} Longhorn, a CNCF project.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
