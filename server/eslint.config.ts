import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import json from "@eslint/json";

export default [
	{
		ignores: [
			"**/node_modules/**",
			"**/dist/**",
			"package-lock.json",
			"tsconfig.json",
		],
	},
	{
		files: ["**/*.{js,mjs,cjs}"],
		...js.configs.recommended,
		languageOptions: {
			globals: globals.node,
		},
	},
	...tseslint.configs.recommended.map((config) => ({
		...config,
		files: ["**/*.{ts,mts,cts}"],
	})),
	{
		files: ["**/*.{ts,mts,cts}"],
		rules: {
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/no-namespace": "off",
		},
	},
	{
		files: ["**/*.json"],
		...json.configs.recommended,
		language: "json/json",
	},
	{
		files: ["**/*.jsonc"],
		...json.configs.recommended,
		language: "json/jsonc",
	},
];
