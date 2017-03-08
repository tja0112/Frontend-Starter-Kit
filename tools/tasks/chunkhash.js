import { join } from 'path';
import gulp from 'gulp';
import template from 'gulp-template';
import inject from 'gulp-inject';
import htmlmin from 'gulp-htmlmin';

import { SOURCE_ROOT, DIST_ROOT } from '../constants';

gulp.task('chunkhash', () => {
  return gulp.src(join(SOURCE_ROOT, 'index.html'))
    .pipe(template({
      polyfills: '<!-- polyfills:js --><!-- endinject -->',
      vendor: '<!-- vendor:js --><!-- endinject -->',
      app: '<!-- app:js --><!-- endinject -->'
    }))
    .pipe(inject(gulp.src(join(DIST_ROOT, 'polyfills-*.js'), { read: false }), { name: 'polyfills', transform(filepath) {
      filepath = filepath.replace(`/public/`, '');
      return `<script src="${filepath}" defer></script>`;
    } }))
    .pipe(inject(gulp.src(join(DIST_ROOT, 'vendor-*.js'), { read: false }), { name: 'vendor', transform(filepath) {
      filepath = filepath.replace(`/public/`, '');
      return `<script src="${filepath}" defer></script>`;
    } }))
    .pipe(inject(gulp.src(join(DIST_ROOT, 'app-*.js'), { read: false }), { name: 'app', transform(filepath) {
      filepath = filepath.replace(`/public/`, '');
      return `<script src="${filepath}" defer></script>`;
    } }))
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      removeComments: true,
      minifyCSS: true,
      minifyJS: true
    }))
    .pipe(gulp.dest(DIST_ROOT));
});