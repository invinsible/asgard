// Подключаем плагины
const gulp = require('gulp');
//const concat = require('gulp-concat');
const sourcemaps = require('gulp-sourcemaps');
const postCss =  require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const server = require('browser-sync').create();
const csso = require('gulp-csso');
const rename = require('gulp-rename');
const imagemin = require('gulp-imagemin');
const webP = require('gulp-webp');
const uglify = require('gulp-uglify');
const sass = require('gulp-sass');
const plumber = require('gulp-plumber');
const del = require('del');

// Удаление папки build
gulp.task('clean', function(){
    return del('build');
})

// Пути откуда брать файлы
const pathFrom = {
    cssFile  : './src/scss/style.scss',
    allCss   : './src/scss/**/*.{scss,sass}',
    jsFile   : './src/js/**/*.js',
    imgFiles : './src/img/*.{png,jpg,svg}',
    htmlFiles: './*.html'
}
// Пути куда возвращать файлы
const pathTo = {
    cssFiles : './build/css',
    jsFiles  : './build/js',
    imgFiles : './build/img',
    fontFiles: './build/fonts'
}

// Обработка CSS
gulp.task('css', function() {
    return gulp.src(pathFrom.cssFile)
    .pipe(plumber())      
    .pipe(sourcemaps.init())
    .pipe(sass())
    .pipe(postCss([ autoprefixer() ]))  
    //.pipe(gulp.dest(pathTo.cssFiles))  
    //.pipe(csso())
    //.pipe(rename('style.min.css'))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(pathTo.cssFiles))
    .pipe(server.stream());
});

gulp.task('js', function() {
    return gulp.src(pathFrom.jsFile)
    //.pipe(uglify())
    .pipe(gulp.dest(pathTo.jsFiles))
    .pipe(server.stream());
});

gulp.task('images', function(){
    return gulp.src('./src/img/*.{png,jpg,svg}')    
    //.pipe(webP({quality: 90}))
    .pipe(imagemin([
        imagemin.optipng({optimizationLevel: 3}),
        imagemin.jpegtran({progressive: true}),
        imagemin.svgo()
    ]))
    .pipe(gulp.dest('./build/img'))
    .pipe(server.stream());
});

gulp.task('fonts', function () { 
    return gulp.src('./src/fonts/*.{woff,woff2,otf}')   
    .pipe(gulp.dest(pathTo.fontFiles));
});

gulp.task('server', function(){
    server.init({
        server: '.'
    });
    gulp.watch(pathFrom.allCss, gulp.series('css'));
    gulp.watch(pathFrom.jsFile, gulp.series('js'));
    gulp.watch(pathFrom.imgFiles, gulp.series('images'));
    gulp.watch(pathFrom.htmlFiles, gulp.series('refresh'));
});

// Перезагрузка сервера
gulp.task('refresh', function(done){
    server.reload();
    done();
});






gulp.task('build', gulp.series('clean', 'fonts', 'css', 'js', 'images'));

gulp.task('start', gulp.series('build', 'server'));


