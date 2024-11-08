const gulp = require("gulp");
require("./gulp/dev.js");
require("./gulp/docs.js");

gulp.task(
  "default",
  gulp.series(
    "clean:dev",
    "includeFiles:dev",
    "sass:dev",
    "copyImages:dev",
    "fonts:dev",
    "js:dev",
    gulp.parallel("startServer:dev", "watch:dev")
  )
);

gulp.task(
  "docs",
  gulp.series(
    "clean:docs",
    gulp.parallel(
      "includeFiles:docs",
      "sass:docs",
      "copyImages:docs",
      "fonts:docs",
      "js:docs"
    ),
    gulp.parallel("startServer:docs", "watch") // Додаємо "watch" разом із сервером
  )
);
