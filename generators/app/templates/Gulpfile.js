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

gulp.task('lint', () => {
	return gulp.src(['!app/lib', '!app/lib/**',
		'!app/dist', '!app/dist/**', 'app/**/*.js'])
		.pipe(eslint())
		.pipe(eslint.format())
		.pipe(eslint.failAfterError());
});

gulp.task('transpile', () => {
	return gulp.src(['!app/lib', '!app/lib/**',
			'!app/dist', '!app/dist/**', 'app/**/*.js'])
		.pipe(sourcemaps.init())
		.pipe(babel())
		.pipe(concat("compiled_source.js"))
		.pipe(sourcemaps.write("."))
		.pipe(gulp.dest("app/dist", {
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
	
	let injectSrc = gulp.src(['!app/lib/', '!app/lib/**', 'app/**/*.css', 'app/**/**.js'], {
		read: false,
	});
	
	return gulp.src('app/*.html').
		pipe(wiredep(options)).
		pipe(injector(injectSrc, injectOptions)).
		pipe(gulp.dest('app'));
});

gulp.task('js-watch', ['lint', 'inject'], () => {
	browserSync.reload();
});

gulp.task('css-watch', ['inject'], () => {
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
	gulp.watch(['!app/lib', 'app/**/*.css'], ['css-watch']);
	gulp.watch(['!app/lib', 'app/**/*.html'], ['html-watch']);
	
});

gulp.task('default', ['lint', 'inject', 'serve']);

