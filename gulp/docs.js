const gulp = require("gulp");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("gulp-autoprefixer");
const csso = require("gulp-csso");
const fileInclude = require("gulp-file-include");
const htmlclean = require("gulp-htmlclean");
const server = require("gulp-server-livereload");
const clean = require("gulp-clean");
const fileSystem = require("fs");
const sourcemaps = require("gulp-sourcemaps");
const plumber = require("gulp-plumber");
const babel = require("gulp-babel");
const notify = require("gulp-notify");
const webpack = require("webpack-stream");
const imagemin = require("gulp-imagemin");

gulp.task("clean:docs", function (done) {
  if (fileSystem.existsSync("./docs/")) {
    return gulp.src("./docs/", { read: false }).pipe(clean());
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

// gulp.task("includeFiles:docs", function () {
//   return gulp
//     .src(["./src/html/**/*.html", "!./src/html/blocks/*.html"])
//     .pipe(plumber(plumberHTMLConfig))
//     .pipe(fileInclude(fileIncludeSettings))
//     .pipe(htmlclean())
//     .pipe(gulp.dest("./docs/"));
// });

gulp.task("includeFiles:docs", function () {
  return gulp
    .src(["./src/html/**/*.html", "!./src/html/blocks/*.html"])
    .pipe(plumber(plumberHTMLConfig))
    .pipe(fileInclude(fileIncludeSettings))
    .pipe(htmlclean())
    .pipe(
      gulp.dest(function (file) {
        // Якщо файл - index.html, розміщуємо його в головній папці
        if (file.basename === "index.html") {
          return "./";
        }
        // Інакше - в папці docs
        return "./docs/";
      })
    );
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
gulp.task("sass:docs", function () {
  return gulp
    .src("./src/scss/*.scss")
    .pipe(plumber(plumberSassConfig))
    .pipe(sourcemaps.init())
    .pipe(autoprefixer())
    .pipe(sass())
    .pipe(csso())
    .pipe(sourcemaps.write())
    .pipe(gulp.dest("./docs/css/"));
});
/*---------------*/

gulp.task("copyImages:docs", function () {
  return gulp
    .src("./src/img/**/*")
    .pipe(imagemin({ verbose: true }))
    .pipe(gulp.dest("./docs/img/"));
});
/*---------------*/

gulp.task("fonts:docs", function () {
  return gulp.src("./src/fonts/**/*").pipe(gulp.dest("./docs/fonts/"));
});

/*---------------*/
//Live Server

const serverSettings = {
  livereload: true,
  open: true,
};

// gulp.task("startServer:docs", function () {
//   return gulp.src("./docs/").pipe(server(serverSettings));
// });

gulp.task("startServer:docs", function () {
  return gulp
    .src("./") // Замість ./docs/
    .pipe(server(serverSettings));
});
/*---------------*/

// WEBPACK
gulp.task("js:docs", function () {
  return gulp
    .src("./src/js/*.js")
    .pipe(babel())
    .pipe(webpack(require("./../webpack.config.js")))
    .pipe(gulp.dest("./docs/js"));
});

/*---------------*/

//..Таск для актуальності папки dist

gulp.task("watch", function () {
  gulp.watch("./src/html/**/*.html", gulp.series("includeFiles:docs"));
  gulp.watch("./src/scss/**/*.scss", gulp.series("sass:docs"));
  gulp.watch("./src/js/**/*.js", gulp.series("js:docs"));
  gulp.watch("./src/img/**/*", gulp.series("copyImages:docs"));
  gulp.watch("./src/fonts/**/*", gulp.series("fonts:docs"));
});
