/* eslint-env node */

import cssPrefix from "autoprefixer";
import copy from "rollup-plugin-copy";
import del from "rollup-plugin-delete";
import postcss from "rollup-plugin-postcss";
// Reason for not using the official TS plugin:
// - https://github.com/rollup/plugins/issues/862
import typescript2 from "rollup-plugin-typescript2";
// import typescript from "@rollup/plugin-typescript";

/** @type {import("rollup-plugin-postcss").PostCSSPluginConf } */
const postcssOptions = {
	plugins: [cssPrefix],
	minimize: false,
	// Extracting is important because we should not force the consumers to
	// use a specific way to handle our CSS imports.
	// See: https://github.com/vercel/next.js/blob/master/errors/css-npm.md
	// Note that the path here is related to the bundled JS files
	extract: "bundle.css",
};

/**
 * Main bundling process
 * @type {import("rollup").RollupOptions}
 */
const bundleMain = {
	input: "src/index.ts",
	output: [
		{ file: "dist/cjs.js", format: "cjs" },
		{ file: "dist/esm.js", format: "esm" },
	],
	external: [
		"@tippyjs/react/headless",
		"focus-visible",
		"react-day-picker/DayPickerInput",
		"react-dom",
		"react-hot-toast",
		"react-icons/go",
		"react-icons/ri",
		"react-popper",
		"react",
		"react/jsx-runtime",
	],
	plugins: [
		del({ targets: ["dist"] }),
		copy({ targets: [{ src: "font", dest: "dist" }] }),
		postcss(postcssOptions),
		typescript2({ useTsconfigDeclarationDir: true }),
	],
};

export default [bundleMain];
