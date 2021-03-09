var gulp = require("gulp");
var connect = require("gulp-connect");

var folder = {
    src:"src/", //开发目录文件夹
    dist:"dist/" //压缩打包后目录文件夹
}

gulp.task("server",function(){
    connect.server();
})

gulp.task("default",gulp.series("server"))