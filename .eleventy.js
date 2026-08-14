const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);

  eleventyConfig.amendLibrary("md", (mdLib) => {
    const defaultRender =
      mdLib.renderer.rules.blockquote_open ||
      function (tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options, env);
      };

    mdLib.renderer.rules.blockquote_open = function (tokens, idx, options, env, self) {
      for (let i = idx + 1; i < tokens.length; i++) {
        if (tokens[i].type === "blockquote_close") break;
        if (tokens[i].type === "inline") {
          const match = /^\*\*(Tip|Note|Warning|Download):\*\*/.exec(tokens[i].content);
          if (match) {
            tokens[idx].attrJoin("class", `callout callout-${match[1].toLowerCase()}`);
          }
          break;
        }
      }
      return defaultRender(tokens, idx, options, env, self);
    };
  });

  eleventyConfig.amendLibrary("md", (mdLib) => {
    const defaultFence =
      mdLib.renderer.rules.fence ||
      function (tokens, idx, options, env, self) {
        return self.renderToken(tokens, idx, options, env);
      };

    mdLib.renderer.rules.fence = function (tokens, idx, options, env, self) {
      const token = tokens[idx];
      if (token.info.trim().toLowerCase() === "mermaid") {
        return `<div class="mermaid">${mdLib.utils.escapeHtml(token.content)}</div>\n`;
      }
      return defaultFence(tokens, idx, options, env, self);
    };
  });

  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("scripts");
  eleventyConfig.addPassthroughCopy("styles");
  eleventyConfig.addPassthroughCopy("assets");

  eleventyConfig.addGlobalData("layout", "layouts/lab.njk");

  eleventyConfig.addGlobalData("eleventyComputed", {
    permalink: (data) => {
      if (data.page.inputPath.endsWith(".njk") && data.page.fileSlug === "index") {
        return "/index.html";
      }
      if (data.series === "HR to Entra ID") {
        return `/${data.page.fileSlug}.html`;
      }
      return data.permalink;
    },
  });

  eleventyConfig.addCollection("labs", (collectionApi) => {
    return collectionApi
      .getAll()
      .filter((item) => item.data.series === "HR to Entra ID")
      .sort((a, b) => a.data.order - b.data.order);
  });

  eleventyConfig.addFilter("pad2", (n) => String(n).padStart(2, "0"));

  eleventyConfig.addFilter("labShortTitle", (title) => {
    const parts = (title || "").split("—");
    return parts.length > 1 ? parts.slice(1).join("—").trim() : title;
  });

  eleventyConfig.addFilter("previousLab", (labs, currentUrl) => {
    const idx = labs.findIndex((item) => item.url === currentUrl);
    return idx > 0 ? labs[idx - 1] : null;
  });

  eleventyConfig.addFilter("nextLab", (labs, currentUrl) => {
    const idx = labs.findIndex((item) => item.url === currentUrl);
    return idx >= 0 && idx < labs.length - 1 ? labs[idx + 1] : null;
  });

  return {
    pathPrefix: "/",
    dir: {
      input: ".",
      includes: "_includes",
      output: "_site",
    },
    markdownTemplateEngine: false,
    htmlTemplateEngine: "njk",
  };
};
