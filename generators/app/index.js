'use strict';
var yeoman = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');

module.exports = yeoman.generators.Base.extend({
  //Configurations will be loaded here.
  //Ask for user input
  prompting: function() {
    var done = this.async();
    this.prompt([
      {
        type: 'input',
        name: 'name',
        message: 'Your project name: ',
        //Defaults to the project's folder name if the input is skipped
        default: this.appname
      },
      {
        type: 'input',
        name: 'author',
        message: 'Your name or organization: ',
      }
      ], function(answers) {
      this.props = answers;
      // this.log(answers.name);
      // this.log(answers.author);
      done();
    }.bind(this));
  },
  //Writing Logic here
  writing: {
    //Copy the configuration files
    config: function() {
      this.fs.copyTpl(
        this.templatePath('_package.json'),
        this.destinationPath('package.json'), {
          name: this.props.name,
          author: this.props.author
        }
      );
      this.fs.copyTpl(
        this.templatePath('_bower.json'),
        this.destinationPath('bower.json'), {
          name: this.props.name,
          author: this.props.author,
        }
      );
      this.fs.copy(
        this.templatePath('.bowerrc'),
        this.destinationPath('.bowerrc')
      );
      this.fs.copy(
        this.templatePath('.gitignore'),
        this.destinationPath('.gitignore')
      );
      this.fs.copy(
        this.templatePath('Gulpfile.js'),
        this.destinationPath('Gulpfile.js')
      );
    },

    //Copy application files
    app: function() {
      //Server file
      this.fs.copyTpl(
        this.templatePath('app'),
        this.destinationPath('app')
      );
    }
  }
});
