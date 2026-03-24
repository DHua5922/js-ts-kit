// @ts-check
// `@type` JSDoc annotations allow editor autocompletion and type checking
// (when paired with `@ts-check`).
// There are various equivalent ways to declare your Docusaurus config.
// See: https://docusaurus.io/docs/api/docusaurus-config

import { themes as prismThemes } from "prism-react-renderer";

const githubUsername = "DHua5922";
const libraryName = "js-ts-kit";
const githubLink = `https://github.com/${githubUsername}/${libraryName}`;

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: libraryName,
  tagline: `Documentation for ${libraryName}`,
  favicon: "img/favicon.ico",

  // Set the production url of your site here
  url: `https://${githubUsername}.github.io`,
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: `/${libraryName}/`,

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: githubUsername, // Usually your GitHub org/user name.
  projectName: libraryName, // Usually your repo name.

  onBrokenLinks: "warn",
  onBrokenMarkdownLinks: "warn",

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },
  themes: ["@docusaurus/theme-live-codeblock"],
  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      {
        docs: {
          sidebarPath: "./sidebars.ts",
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl: `${githubLink}/tree/main/documentation/`,
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    {
      // Replace with your project's social card
      image: "img/docusaurus-social-card.jpg",
      colorMode: {
        disableSwitch: true, // Disable the theme switch
        defaultMode: "light", // Set default mode to light
      },
      navbar: {
        title: libraryName,
        logo: {
          alt: "My Site Logo",
          src: "img/logo.png",
        },
        items: [
          {
            type: "docSidebar",
            sidebarId: "tutorialSidebar",
            position: "left",
            label: "Get Started",
          },
          {
            href: githubLink,
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "light",
        links: [
          {
            title: "Docs",
            items: [
              {
                label: "Tutorial",
                to: "/docs/Installation",
              },
            ],
          },
          {
            title: "More",
            items: [
              {
                label: "GitHub",
                href: githubLink,
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} ${libraryName}`,
      },
      prism: {
        theme: prismThemes.github,
        darkTheme: prismThemes.dracula,
      },
    },
};

export default config;
