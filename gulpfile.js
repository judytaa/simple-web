var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");

//nazwa zadania moze byc wymyslona
//kopiowanie plików do dist
gulp.task("copy", function() {
    gulp.src("src/css/main.css")
        .pipe(gulp.dest("dist/css/"));
    gulp.src("src/index.html")
        .pipe(gulp.dest("dist/"));
    gulp.src("src/img")
        .pipe(gulp.dest("dist/img/"));
    gulp.src("src/sass")
        .pipe(gulp.dest("dist/sass/"));
});

gulp.task('sass', function () {
    gulp.src('src/sass/main.sass') // sciezka do pliku sass
        .pipe(plumber()) //przepuszczamy plik najpierw przez to, ktore wylapuje bledy
        .pipe(sass.sync()) // przepuszczamy plik przez plugin sass
        .pipe(gulp.dest('src/css')) //sciezka docelowa pliku css
        .pipe(browserSync.stream()); // tutaj dolaczamy serwer

});

gulp.task('watch', function () {
    gulp.watch('src/sass/*/*.sass',['sass']); // dodatkowa gwiazdka ma wybrac wszystkie pliki z folderu
    gulp.watch(['src/*.html', 'src/js/*.js'], browserSync.reload);
});

//tworzenie "serwera"
var browserSync = require("browser-sync").create();
gulp.task("server", function() {
    browserSync.init({ //odwolujemy sie do tego "pluginu" po zmiennej ktota wczesniej utworzylam
        server:"src"
    })
});

gulp.task("default",["sass", "server", "watch"]); //default oznacza, ze moge wywowalc zadanie gulp - bez zbednych taskowgulp