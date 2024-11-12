const gulp = require('gulp');
const babel = require('gulp-babel');
const postcss = require('gulp-postcss');
const sourcemaps = require('gulp-sourcemaps');
const flexGapPolyfill = require("flex-gap-polyfill");

// Diretórios
const paths = {
  js: {
    src: 'src/js/**/*.js',
    dest: 'dist/js'
  },
  css: {
    src: 'src/css/**/*.css',
    dest: 'dist/css'
  }
};

// Tarefa para transpilar JavaScript
function js() {
  return gulp.src(paths.js.src)
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: [
        ['@babel/preset-env', {
          targets: {
            browsers: ['last 2 versions', 'Android >= 5', 'iOS >= 12']
          },
          useBuiltIns: 'entry',
          corejs: 3
        }]
      ],      
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.js.dest));
}

// Tarefa para processar CSS
function css() {
  return gulp.src(paths.css.src)
    .pipe(sourcemaps.init())
    .pipe(postcss([
      require('postcss-preset-env')({
        stage: 3, // Define o nível de compatibilidade (3 é recomendado para compatibilidade com versões mais antigas)
        browsers: ['last 2 versions', 'Android >= 5', 'iOS >= 12']
      }),
      flexGapPolyfill()
    ]))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(paths.css.dest));
}

// Tarefa de watch para mudanças nos arquivos
function watch() {
  gulp.watch(paths.js.src, js);
  gulp.watch(paths.css.src, css);
}

// Exporta as tarefas
exports.js = js;
exports.css = css;
exports.watch = watch;
exports.default = gulp.series(gulp.parallel(js, css), watch);
