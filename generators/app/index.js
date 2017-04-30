"use strict";

const yeoman = require("yeoman-generator");
const chalk = require("chalk");
const yosay = require("yosay");
const path = require("path");
const mkdirp = require("mkdirp");

module.exports = yeoman.generators.Base.extend({
	// Configurations will be loaded here.
	// Ask for user input
	prompting () {
		
		const done = this.async();
		
		this.prompt([
			{
				type: "input",
				name: "name",
				message: "Your project name: ",
				// Defaults to the project"s folder name if the input is skipped
				default: this.appname.replace(/\s+/g, "-")
			},
			{
				type: "input",
				name: "author",
				message: "Your name or organization: "
			}
		], function (answers) {
			
			this.props = answers;
			done();
		
		}.bind(this));
	
	},
	// Writing Logic here
	writing: {
		// Copy the configuration files
		config () {
			
			this.fs.copyTpl(
				this.templatePath("_package.json"),
				this.destinationPath("package.json"), {
					name: this.props.name,
					author: this.props.author
				}
			);
			this.fs.copyTpl(
				this.templatePath("_bower.json"),
				this.destinationPath("bower.json"), {
					name: this.props.name,
					author: this.props.author
				}
			);
			this.fs.copyTpl(
				this.templatePath("README.md"),
				this.destinationPath("README.md"), {
					name: this.props.name,
					author: this.props.author
				}
			);
			
			
			// Configuration Files
			this.fs.copy(
				this.templatePath("_babelrc"),
				this.destinationPath(".babelrc")
			);
			this.fs.copy(
				this.templatePath("_bowerrc"),
				this.destinationPath(".bowerrc")
			);
			this.fs.copy(
				this.templatePath("_eslintrc.json"),
				this.destinationPath(".eslintrc.json")
			);
			this.fs.copy(
				this.templatePath("_gitignore"),
				this.destinationPath(".gitignore")
			);
			this.fs.copy(
				this.templatePath("Gulpfile.js"),
				this.destinationPath("Gulpfile.js")
			);
		
		},

		// Copy application files
		app () {
			
			// Server file
			this.fs.copy(
				this.templatePath("app"),
				this.destinationPath("app")
			);
			
			this.fs.copyTpl(
				this.templatePath("app/index.html"),
				this.destinationPath("app/index.html"), {name: this.props.name}
			);
			
			mkdirp.sync(path.join("app", "dist"));
		
		}
		
	}
	
});
