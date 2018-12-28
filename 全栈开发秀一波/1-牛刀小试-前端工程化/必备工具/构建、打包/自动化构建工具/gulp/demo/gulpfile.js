var gulp = require('gulp'),
    minifyHtml = require('gulp-minify-html'),
    sass = require('gulp-sass'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    minifyCss = require('gulp-minify-css'),
    babel = require('gulp-babel'),
    uglify = require('gulp-uglify');

//html压缩:gulp-minify-html
gulp.task('minify_html', function(){
    gulp.src('src/*.html')
        .pipe(minifyHtml())
        .pipe(gulp.dest('bulid'));
});

//编译sass，css压缩（合并、压缩:gulp-minify-css、重命名）
gulp.task('compile-sass', function(){
    gulp.src('src/css/*.scss')
    .pipe(sass())
    .pipe(gulp.dest('src/css'));
});
gulp.task('minify_css',['compile-sass'], function(){
    gulp.src('src/css/*.css')
        .pipe(concat('index.css'))
        .pipe(minifyCss())
        .pipe(rename('index.min.css'))
        .pipe(gulp.dest('bulid/css'));
});


//编译es6，js压缩（合并:gulp-concat、压缩:gulp-uglify、重命名:gulp-rename）
//gulp的ES6转换问题Cannot find module '@babel/core'----https://blog.csdn.net/haoxuexiaolang/article/details/79618232
gulp.task('compile-js', function(){
    gulp.src('src/js/es6.js')
        .pipe(babel({
            presets: ['es2015']
        }))
        .pipe(rename('es5.js'))
        .pipe(gulp.dest('src/js'))
});
gulp.task('minify_js',['compile-js'], function(){
    //'!src/js/es6.js',过滤掉es6.js文件
    gulp.src(['src/js/*.js','!src/js/es6.js'])
        .pipe(concat('index.js'))
        .pipe(uglify())
        .pipe(rename('index.min.js'))
        .pipe(gulp.dest('bulid/js'));
});

//监听index.html，sass文件、css文件、js文件等，改变时自动编译
gulp.task('watch',function(){
    gulp.watch('src/index.html',['minify_html']);
    // **是指所有深度的文件夹，包括varible和mixin
    gulp.watch('src/css/**/*.scss',['compile-sass']);
    gulp.watch('src/css/*.css', ['minify_css']);
    gulp.watch('src/js/es6.js', ['compile-js']);
    gulp.watch(['src/js/*.js', '!src/js/es6.js'], ['minify_js']);
});