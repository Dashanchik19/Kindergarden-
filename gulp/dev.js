const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const fileInclude = require("gulp-file-include");
const server = require("gulp-server-livereload");
const clean = require("gulp-clean");
const fileSystem = require("fs");
const sourcemaps = require("gulp-sourcemaps");
const plumber = require("gulp-plumber");
const notify = require("gulp-notify");
const webpack = require("webpack-stream");
const imagemin = require("gulp-imagemin");
const changed = require("gulp-changed");
const sassGlob = require("gulp-sass-glob");

gulp.task("clean:dev", function (done) {
  if (fileSystem.existsSync("./build/")) {
    return gulp.src("./build/", { read: false }).pipe(clean());
  }
  done();
});

const fileIncludeSettings = {
  prefix: "@@",
  basepath: "@file",
};

const plumberHTMLConfig = {
  errorHandler: notify.onError({
    title: "HTML",
    message: "Error <%= error.message %>",
    sound: false,
  }),
};

gulp.task("includeFiles:dev", function () {
  return gulp
    .src(["./src/html/**/*.html", "!./src/html/blocks/*.html"])
    .pipe(changed("./../build/", { hasChanged: changed.compareContents }))
    .pipe(plumber(plumberHTMLConfig))
    .pipe(fileInclude(fileIncludeSettings))
    .pipe(gulp.dest("./build/"));
});
/*---------------*/

//Бокове попередження щодо помилок
const plumberSassConfig = {
  errorHandler: notify.onError({
    title: "Styles",
    message: "Error <%= error.message %>",
    sound: false,
  }),
};
//Компіляція
gulp.task("sass:dev", function () {
  return gulp
    .src("./src/scss/*.scss")
    .pipe(plumber(plumberSassConfig))
    .pipe(sourcemaps.init())
    .pipe(sassGlob())
    .pipe(sass())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./build/css/"));
});
/*---------------*/

gulp.task("copyImages:dev", function () {
  return (
    gulp
      .src("./src/img/**/*")
      // .pipe(imagemin({ verbose: true }))
      .pipe(gulp.dest("./build/img/"))
  );
});
/*---------------*/

gulp.task("fonts:dev", function () {
  return gulp.src("./src/fonts/**/*").pipe(gulp.dest("./build/fonts/"));
});

/*---------------*/
//Live Server

const serverSettings = {
  livereload: true,
  open: true,
};

gulp.task("startServer:dev", function () {
  return gulp.src("./build/").pipe(server(serverSettings));
});
/*---------------*/

// WEBPACK
gulp.task("js:dev", function () {
  return gulp
    .src("./src/js/*.js")
    .pipe(webpack(require("./../webpack.config.js")))
    .pipe(gulp.dest("./build/js"));
});

/*---------------*/

//..Таск для актуальності папки dist

gulp.task("watch:dev", function () {
  gulp.watch("./src/scss/**/*.scss", gulp.parallel("sass:dev"));
  gulp.watch("./src/**/*.html", gulp.parallel("includeFiles:dev"));
  gulp.watch("./src/img/**/*", gulp.parallel("copyImages:dev"));
  gulp.watch("./src/fonts/**/*", gulp.parallel("fonts:dev"));
  gulp.watch("./src/js/**/*.js", gulp.parallel("js:dev"));
});
