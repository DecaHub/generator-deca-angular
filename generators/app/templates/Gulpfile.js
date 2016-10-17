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
		'app/dist/**/*.css',
		'app/dist/app.js',
		'app/dist/**/*module.js',
		'app/dist/**/*constants.js',
		'app/dist/**/*provider.js',
		'app/dist/**/*enum.js',
		'app/dist/**/*model.js',
		'app/dist/**/*config.js',
		'app/dist/**/*filter.js',
		'app/dist/**/*directive.js',
		'app/dist/**/*decorator.js',
		'app/dist/**/*interceptor.js',
		'app/dist/**/*service.js',
		'app/dist/**/*workflow.js',
		'app/dist/**/*repository.js',
		'app/dist/**/*resolver.js',
		'app/dist/**/*controller.js',
		'app/dist/**/**.js'], {
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

