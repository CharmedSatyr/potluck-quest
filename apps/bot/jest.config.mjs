"use strict";
/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */
export default {
	// Automatically clear mock calls, instances, contexts and results before every test
	clearMocks: true,
	// Indicates whether the coverage information should be collected while executing the test
	collectCoverage: true,
	// The directory where Jest should output its coverage files
	coverageDirectory: "coverage",
	// A map from regular expressions to module names or to arrays of module names that allow to stub out resources with a single module
	moduleNameMapper: {
		"^(\\.{1,2}/.*)\\.js$": "$1", // Strip .js extensions for Jest
	},
	// A preset that is used as a base for Jest's configuration
	preset: "ts-jest",
};
