// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from "prism-react-renderer";

import dsVariableProcessor from "./js-lib/docusaurus-variables.js";
import lhSubstituteCurrentVersion from "./js-lib/longhorn-versions.js";

/** @type {import('@docusaurus/types').Config} */
const config = {
  markdown: {
    preprocessor: ({ filePath, fileContent }) => {
      // Process Longhorn versions
      fileContent = lhSubstituteCurrentVersion(fileContent, filePath);

      // Process variables
      fileContent = dsVariableProcessor(fileContent);
      return fileContent;
    },
  },
  title: "Longhorn",
  tagline:
    "Longhorn is a lightweight, reliable, and powerful distributed block storage system for Kubernetes.",
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: "https://longhorn.io",
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: "/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "longhorn", // Usually your GitHub org/user name.
  projectName: "website", // Usually your repo name.

  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: "./sidebars.js",
          editUrl: "https://github.com/longhorn/website/content/docs",
        },
        blog: {
          showReadingTime: true,
          blogSidebarTitle: "All posts",
          blogSidebarCount: "ALL",
          editUrl: "https://github.com/longhorn/website/content/blog/",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      }),
    ],
  ],

  plugins: [
    [
      "@docusaurus/plugin-content-blog",
      {
        id: "kb",
        routeBasePath: "kb",
        path: "./kb",
        showReadingTime: true,
        blogSidebarTitle: "All articles",
        blogSidebarCount: "ALL",
        editUrl: "https://github.com/longhorn/website/content/kb/",
      },
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
        title: "Longhorn",
        logo: {
          alt: "Longhorn Logo",
          src: "img/logo.svg",
        },
        items: [
          {
            type: "docsVersionDropdown",
            position: "left",
            dropdownActiveClassDisabled: true,
            label: "Documentation",
          },
          {
            href: "/blog",
            label: "Blog",
            position: "left",
          },
          {
            href: "/kb",
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
        style: "dark",
        copyright: `Copyright © ${new Date().getFullYear()} Longhorn, a CNCF project.`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    }),
};

export default config;
