export default {
	preset: "ts-jest/presets/default-esm",
	testEnvironment: "node",
	extensionsToTreatAsEsm: [".ts"],
	moduleNameMapper: {
		"^(\\.{1,2}/.*)\\.js$": "$1",
	},
	transform: {
		"^.+\\.tsx?$": [
			"ts-jest",
			{
				useESM: true,
				tsconfig: {
					module: "esnext",
					moduleResolution: "bundler",
				},
			},
		],
	},
	testMatch: ["**/tests/**/*.test.ts", "**/tests/**/*.spec.ts"],
	collectCoverageFrom: [
		"src/**/*.ts",
		"!src/**/*.d.ts",
		"!src/**/*.interface.ts",
	],
	coverageDirectory: "coverage",
	coverageReporters: ["text", "lcov", "html"],
	roots: ["<rootDir>/src", "<rootDir>/tests"],
	moduleDirectories: ["node_modules", "src"],
};
