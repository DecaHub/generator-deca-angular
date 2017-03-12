"use strict";

/* global define describe, before, it */

const path = require("path");
const assert = require("yeoman-generator").assert;
const helpers = require("yeoman-generator").test;
const os = require("os");

describe("deca-angular:app", function () {
	
	before(function (done) {
		
		helpers.run(path.join(__dirname, "../generators/app"))
			.withOptions({skipInstall: true})
			.withPrompts({someOption: true})
			.on("end", done);
	
	});

	it("creates files", function () {
		
		assert.file([
			".babelrc",
			".bowerrc",
			".gitignore",
			"bower.json",
			"package.json",
			".eslintrc.json",
			"Gulpfile.js",
			"README.md",
			"app",
			"app/dist",
			"app/index.html",
			"app/main.app.js",
			"app/main.controller.js",
			"app/main.scss"
		]);
	
	});

});
