// Diagram sources ship as plain text inside .mermaid blocks. The "js-mermaid"
// class set in <head> hides them until this module swaps in rendered SVG; if
// the CDN is unreachable, dropping the class restores the readable source.
const root = document.documentElement;

try {
  const { default: mermaid } = await import(
    "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs"
  );

  mermaid.initialize({
    startOnLoad: false,
    theme: "base",
    fontFamily: '"Inter", system-ui, -apple-system, sans-serif',
    themeVariables: {
      background: "#f7f7f7",
      primaryColor: "#ffffff",
      primaryTextColor: "#000000",
      primaryBorderColor: "#000000",
      secondaryColor: "#f7f7f7",
      tertiaryColor: "#ffffff",
      lineColor: "#6b6b6b",
      fontSize: "14px",
    },
  });

  await mermaid.run({ querySelector: ".prose .mermaid" });
} catch (error) {
  root.classList.remove("js-mermaid");
  console.error("Mermaid failed to load; showing diagram source instead.", error);
}
