"use strict";

const gulp = require('gulp');
const injector = require('gulp-inject');
const browserSync = require('browser-sync').create();
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');
const concat = require('gulp-concat');
const eslint = require('gulp-eslint');
const less = require('gulp-less');
const path = require('path');
const util = require('gulp-util');

gulp.task('less', () => {
	return gulp.src('app/**/*.less')
		.pipe(less())
		.pipe(gulp.dest('app/dist/styles', {
			overwrite: "true"
		}));
});

gulp.task('lint', () => {
	return gulp.src(['!app/lib', '!app/lib/**',
			'!app/dist', '!app/dist/**', 'app/**/*.js'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

// Uncomment concat pipe to unable universal concatenation
gulp.task('transpile', () => {
	return gulp.src(['!app/lib', '!app/lib/**',
			'!app/dist', '!app/dist/**', 'app/**/*.js'])
		.pipe(sourcemaps.init())
		.pipe(babel())
		// .pipe(concat("compiled_source.js"))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest("app/dist/src", {
			overwrite: true
		}))
});

gulp.task('inject', () => {
	let wiredep = require('wiredep').stream;
	
	let options = {
		bowerJson: require('./bower.json'),
		directory: 'app/lib'
	};
	
	let injectOptions = {
		ignorePath: 'app/',
		addRootSlash: false
	};
	
	// let injectSrc = gulp.src(['!app/lib/', '!app/lib/**', 'app/**/*.css', 'app/**/**.js'], {
	// 	read: false,
	// });
	
	let injectSrc = gulp.src([
		'app/dist/src/**/*.css',
		'app/dist/src/app.js',
		'app/dist/src/**/*module.js',
		'app/dist/src/**/*constants.js',
		'app/dist/src/**/*provider.js',
		'app/dist/src/**/*enum.js',
		'app/dist/src/**/*model.js',
		'app/dist/src/**/*config.js',
		'app/dist/src/**/*filter.js',
		'app/dist/src/**/*directive.js',
		'app/dist/src/**/*decorator.js',
		'app/dist/src/**/*interceptor.js',
		'app/dist/src/**/*service.js',
		'app/dist/src/**/*workflow.js',
		'app/dist/src/**/*repository.js',
		'app/dist/src/**/*resolver.js',
		'app/dist/src/**/*controller.js',
		'app/dist/src/**/**.js'], {
		read: false,
	});
	
	return gulp.src('app/*.html').
	pipe(wiredep(options)).
	pipe(injector(injectSrc, injectOptions)).
	pipe(gulp.dest('app'));
});

gulp.task('js-watch', ['lint', 'transpile', 'inject'], () => {
	browserSync.reload();
});

gulp.task('less-watch', ['less', 'inject'], () => {
	browserSync.reload();
});

gulp.task('html-watch', ['inject'], () => {
	browserSync.reload();
});

gulp.task('serve', () => {
	browserSync.init({
		server: {
			baseDir: "app"
		}
	});
	
	gulp.watch(['!app/lib', 'app/**/*.js'], ['js-watch']);
	gulp.watch(['!app/lib', 'app/**/*.less'], ['less-watch']);
	gulp.watch(['!app/lib', 'app/**/*.html'], ['html-watch']);
	
});

gulp.task('default', ['less', 'lint', 'transpile', 'inject', 'serve']);

