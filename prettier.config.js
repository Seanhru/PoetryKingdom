/** @type {import('prettier').Config & import('prettier-plugin-tailwindcss').PluginOptions} */
const config = {
  plugins: ["prettier-plugin-tailwindcss"],
  trailingComma: "all",
  tabWidth: 4, 
  useTabs: true, 
  semi: true, 
  singleQuote: false,
};

export default config;
