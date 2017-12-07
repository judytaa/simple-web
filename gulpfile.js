var gulp = require("gulp");
var sass = require("gulp-sass");
var plumber = require("gulp-plumber");
var del = require("del");
var runSequence = require('run-sequence');
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');


//nazwa zadania moze byc wymyslona
//kopiowanie plików do dist
gulp.task("copy", function() {
// zadanie poniżej jest ok, bo tam "chwyta" plik CSS który został utworzony za pomocą zadania "sass" i przenosi go odpowiednio
    gulp.src("src/css/main.css")
        .pipe(gulp.dest("dist/css/"));
// do obrazków też jest osobne zadanie które je minimalizuje i przenosi, ale darujemy sobie to więc niech zostanie to zadanko w kopiowaniu
    gulp.src("src/img")
        .pipe(gulp.dest("dist/img/"));
});

gulp.task("js", function() {
    // standardowo najpierw "chwytamy" to co chcemy, w tym przypadku src/js/*.js czyli wszystkie pliki w folderze js które mają rozszerzenie .js
    gulp.src("src/js/*.js")
    // przepuszczamy też standardowo przez naszą wtyczkę, czyli uglify()
        .pipe(uglify())
        // wybieramy destination, czyli ceeeel :D
        .pipe(gulp.dest("dist/js"));
});

gulp.task('html', function() {
    // wybieramy plik, który chcemy zminimalizować
    return gulp.src('src/*.html')
    // za pomocą pipe przepuszczamy go przez nasz plugin
        .pipe(htmlmin({collapseWhitespace: true}))
        // podajemy ścieżkę, gdzie chcemy żeby nasz gotowy plik się znajdował
        .pipe(gulp.dest('dist'));
});

gulp.task('sass', function () {
    gulp.src('src/sass/main.sass') // sciezka do pliku sass
        .pipe(plumber()) //przepuszczamy plik najpierw przez to, ktore wylapuje bledy
        .pipe(sass.sync()) // przepuszczamy plik przez plugin sass
        .pipe(gulp.dest('src/css')) //sciezka docelowa pliku css
        .pipe(browserSync.stream()); // tutaj dolaczamy serwer

});

gulp.task('clean', function() {
    del('dist/');
});

gulp.task('watch', function () {
    gulp.watch('src/sass/*/*.sass',['sass']); // dodatkowa gwiazdka ma wybrac wszystkie pliki z folderu
    gulp.watch(['src/*.html', 'src/js/*.js'], browserSync.reload);
});

//tworzenie "serwera"
var browserSync = require("browser-sync").create();
gulp.task("server", function() {
    browserSync.init({ //odwolujemy sie do tego "pluginu" po zmiennej ktora wczesniej utworzylam
        server:"src"
    })
});

gulp.task("build", function() {

    runSequence("clean", "html", "js", "copy");

});

gulp.task("default",["sass", "server", "watch"]); //default oznacza, ze moge wywowalc zadanie gulp - bez zbednych taskowgulp