Yeoman `deca-angular` generator
=======================

This is a Yeoman custom generator demo.

_package.json, _bower.json will be the files that will be copied to create the generator. 
package.json, bower.json are to be used for testing as they do not have dynamic components (such as name and author).

To try:

* Clone
* npm install
* npm link
* yo deca-angular

If using Yarn:

* Clone
* yarn
* yarn link
* yo deca-angular

After the scaffolding has finished:

If npm: `npm start`
If yarn: `yarn start`

## Usage

### Conventions

For the project’s JavaScript files, please follow this naming convention as it helps the project sort out your AngularJS files and inject them automatically in the correct order:

``` javascript
/**
  Each file type is denoted by its ending name.
  A dot (.) should be placed before the name expect for the app.js file
  For example: sample.controller.js
  The files will be injected in index.html in this order from top to bottom.
  This ensures that each file has its proper dependencies injected before its
  own injection.
**/

  'app/**/*.app.js',
  'app/**/*.module.js',
  'app/**/*.constants.js',
  'app/**/*.provider.js',
  'app/**/*.enum.js',
  'app/**/*.model.js',
  'app/**/*.config.js',
  'app/**/*.filter.js',
  'app/**/*.directive.js',
  'app/**/*.decorator.js',
  'app/**/*.interceptor.js',
  'app/**/*.service.js',
  'app/**/*.workflow.js',
  'app/**/*.repository.js',
  'app/**/*.resolver.js',
  'app/**/*.controller.js',
  'app/**/*.component.js',
  'app/**/*.js'

  // Non-Angular scripts are injected last.
```

### CAUTION

* When adding or removing dependencies with bower, it is critical that you use the --save tag along with install or uninstall. Otherwise, the `inject:lib` task won't get triggered and index.html won’t be updated. You would not want to just remove the files from the `lib` folder but leave their declaration as dependencies in `bower.json`; otherwise, the next time that you run `bower install` those undesired packages will be installed – adding unnecessary bulk to the project. 

* It is critical to always start the project using `yarn start` instead of `gulp`; otherwise, you won't be able to inject dependencies already added to the `lib` folder. After the project is running, feel free to use any `gulp` task independently.


### Building for GitHub Pages:

At any stage of your development, you can build/re-build the docs folder that will be used by Github Pages as the source of content for your Page by running this command in another terminal window:

`gulp build:docs`

The docs folder will be create (or deleted and re-created) and populated with the transformed .scss and .js files along with the other project files needed to have a working page equal to the one you have been playing around with during development. 

To enable this Github feature:

* Go to your repo Settings.
* Scroll down to the Github Pages section.
* On Source select "master branch /docs folder". Note: If there is no docs folder in the repo, descendant of the root, this option will be disabled. 
* Click Save.
* Click on the link shown in the green banner and enjoy your live page! 

