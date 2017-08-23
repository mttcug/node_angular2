/**
 * Created by Administrator on 2017/8/16 0016.
 */
var gulp=require("gulp");
var del=require('del');
var tsc=require('gulp-typescript');
var tsProject=tsc.createProject('tsconfig.json');
var nodemon=require('gulp-nodemon');
var concat=require('gulp-concat');
var runSequence=require('run-sequence');
var tslint=require('gulp-tslint');
var sourcemaps=require('gulp-sourcemaps');

/*
*清理dist
 */
gulp.task('clean',()=>{
    return del(['dist']).then(()=>{
        console.log('清理完成');
    })
});

/*
生成dist／server
 */
var servertsFiles=['server/**/*.ts'],
    serverotherFiles=['server/*','!server/**/*.ts'];
gulp.task('build:server',()=>{
    var tsServerProject=tsc.createProject('server/tsconfig.json');

    var tsResult=gulp.src(servertsFiles)
        .pipe(sourcemaps.init())
        .pipe(tsServerProject());
    return tsResult.js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/server'));
});
gulp.task('serverResource',()=>{
    return gulp.src(serverotherFiles)
        .pipe(gulp.dest('dist/server/bin'));
})


/*
生成dist/client
 */
var clientTsFiles=['client/src/*.ts','client/src/**.*.ts'];
var clientSourceFiles=['client/src/*','!client/src/*.ts','!client/src/**.*.ts'];

gulp.task('build:client',()=>{
    var tsClientProject=tsc.createProject('client/tsconfig.json');

    var tsResult=gulp.src(clientTsFiles)
        .pipe(sourcemaps.init())
        .pipe(tsClientProject());

    return tsResult.js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dist/client'))

});

gulp.task('clientSource',()=>{
    return gulp.src(clientSourceFiles)
        .pipe(gulp.dest('dist/client'));
})

gulp.task('default',()=>{
    runSequence('clean','build:server','serverResource','build:client','clientSource');
})


