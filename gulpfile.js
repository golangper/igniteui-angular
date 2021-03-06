'use strict';

const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();
const del = require('del');
const gulp = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass');
const shell = require('gulp-shell');
const sourcemaps = require('gulp-sourcemaps');
const postcss = require('gulp-postcss');
const uglify = require('gulp-uglify');
const process = require('process');
const fs = require('fs');
const {
    spawnSync
} = require('child_process');

const STYLES = {
    SRC: './projects/igniteui-angular/src/lib/core/styles/themes/presets/*',
    DIST: './dist/igniteui-angular/styles',
    MAPS: './maps',
    THEMING: {
        SRC: './projects/igniteui-angular/src/lib/core/styles/**/*',
        DIST: './dist/igniteui-angular/lib/core/styles'
    },
    CONFIG: {
        outputStyle: 'compressed'
    }
};

const TYPEDOC_THEME = {
    SRC: './extras/docs/themes/typedoc/src/',
    DIST: './extras/docs/themes/typedoc/bin/',
    STYLES: {
        ENTRY: './assets/css/main.sass',
        OUT: './assets/css',
        MAPS: './',
        CONFIG: {
            outputStyle: 'compressed'
        }
    }
}

gulp.task('build-style', () => {
    const prefixer = postcss([autoprefixer({
        browsers: ['last 5 versions', '> 3%'],
        cascade: false,
        grid: true
    })]);

    gulp.src(STYLES.THEMING.SRC)
        .pipe(gulp.dest(STYLES.THEMING.DIST));

    return gulp.src(STYLES.SRC)
        .pipe(sourcemaps.init())
        .pipe(sass.sync(STYLES.CONFIG).on('error', sass.logError))
        .pipe(prefixer)
        .pipe(sourcemaps.write(STYLES.MAPS))
        .pipe(gulp.dest(STYLES.DIST))
});

gulp.task('copy-git-hooks', () => {

    if (process.env.AZURE_PIPELINES || process.env.TRAVIS || process.env.CI || !fs.existsSync('.git')) {
        return;
    }

    const gitHooksDir = './.git/hooks/';
    const defaultCopyHookDir = gitHooksDir + 'scripts/';
    const dirs = [
        gitHooksDir,
        defaultCopyHookDir,
        defaultCopyHookDir + 'templates',
        defaultCopyHookDir + 'templateValidators',
        defaultCopyHookDir + 'utils'
    ];

    dirs.forEach((dir) => {
        if (!fs.existsSync(dir)) {
            fs.mkdir(dir, (err) => {
                if (err) {
                    throw err;
                }
            });
        }
    });

    const defaultHookDir = './.hooks/scripts/';

    fs.copyFileSync(defaultHookDir + 'templates/default.js',
        defaultCopyHookDir + 'templates/default.js');

    fs.copyFileSync(defaultHookDir + 'templateValidators/default-style-validator.js',
        defaultCopyHookDir + 'templateValidators/default-style-validator.js');

    fs.copyFileSync(defaultHookDir + 'utils/issue-validator.js',
        defaultCopyHookDir + 'utils/issue-validator.js');

    fs.copyFileSync(defaultHookDir + 'utils/line-limits.js',
        defaultCopyHookDir + 'utils/line-limits.js');

    fs.copyFileSync(defaultHookDir + 'common.js',
        defaultCopyHookDir + 'common.js');

    fs.copyFileSync(defaultHookDir + 'validate.js',
        defaultCopyHookDir + 'validate.js');

    fs.copyFileSync('./.hooks/prepare-commit-msg',
        './.git/hooks/prepare-commit-msg');
});

gulp.task('copy-migrations', () => {
    return gulp.src([
            './projects/igniteui-angular/migrations/**/*.json',
            '!**/tsconfig.json'
        ])
        .pipe(gulp.dest('./dist/igniteui-angular/migrations'));
});

gulp.task('typedoc-styles', ['typedoc:clean-styles'], () => {
    const prefixer = postcss([autoprefixer({
        browsers: ['last 5 versions', '> 3%'],
        cascade: false,
        grid: false
    })]);

    return gulp.src(`${TYPEDOC_THEME.SRC}/${TYPEDOC_THEME.STYLES.ENTRY}`)
        .pipe(sourcemaps.init())
        .pipe(sass.sync(TYPEDOC_THEME.STYLES.CONFIG).on('error', sass.logError))
        .pipe(prefixer)
        .pipe(sourcemaps.write(TYPEDOC_THEME.STYLES.MAPS))
        .pipe(gulp.dest(`${TYPEDOC_THEME.DIST}/${TYPEDOC_THEME.STYLES.OUT}`))
});

gulp.task('typedoc-ts',
    shell.task('tsc --project ./extras/docs/themes/typedoc/tsconfig.json')
);

gulp.task('typedoc-js', ['typedoc-ts'], () => {
    return gulp.src([
            `${TYPEDOC_THEME.SRC}/assets/js/lib/jquery-2.1.1.min.js`,
            `${TYPEDOC_THEME.SRC}/assets/js/lib/underscore-1.6.0.min.js`,
            `${TYPEDOC_THEME.SRC}/assets/js/lib/backbone-1.1.2.min.js`,
            `${TYPEDOC_THEME.SRC}/assets/js/lib/lunr.min.js`,
            `${TYPEDOC_THEME.SRC}/assets/js/main.js`
        ])
        .pipe(concat('main.js'))
        // .pipe(uglify({
        //     mangle: false
        // }))
        .pipe(gulp.dest(`${TYPEDOC_THEME.DIST}/assets/js/`));
});

gulp.task('typedoc-images', ['typedoc:clean-images'], () => {
    return gulp.src(`${TYPEDOC_THEME.SRC}/assets/images/**/*.{png,gif,jpg}`)
        .pipe(gulp.dest(`${TYPEDOC_THEME.DIST}/assets/images`));
});

gulp.task('typedoc-hbs', ['typedoc:clean-hbs'], () => {
    return gulp.src([
            `${TYPEDOC_THEME.SRC}/layouts/**/*`,
            `${TYPEDOC_THEME.SRC}/partials/**/*`,
            `${TYPEDOC_THEME.SRC}/templates/**/*`,
        ], {
            base: `${TYPEDOC_THEME.SRC}`
        })
        .pipe(gulp.dest(`${TYPEDOC_THEME.DIST}`));
});

gulp.task('typedoc:clean-js', () => {
    del.sync(`${TYPEDOC_THEME.DIST}/assets/js`);
});

gulp.task('typedoc:clean-styles', () => {
    del.sync(`${TYPEDOC_THEME.DIST}/assets/css`);
});

gulp.task('typedoc:clean-images', () => {
    del.sync(`${TYPEDOC_THEME.DIST}/assets/images`);
});

gulp.task('typedoc:clean-hbs', () => {
    del.sync([
        `${TYPEDOC_THEME.DIST}/layouts`,
        `${TYPEDOC_THEME.DIST}/partials`,
        `${TYPEDOC_THEME.DIST}/templates`
    ]);
});

gulp.task('typedoc-watch', ['typedoc-build:theme'], () => {
    gulp.watch([
        `${TYPEDOC_THEME.SRC}/assets/js/src/**/*.{ts,js}`,
        `${TYPEDOC_THEME.SRC}/assets/css/**/*.{scss,sass}`,
        `${TYPEDOC_THEME.SRC}/**/*.hbs`,
        `${TYPEDOC_THEME.SRC}/assets/images/**/*.{png,jpg,gif}`,
    ], ['typedoc-build:theme']);
});

gulp.task('typedoc-build', [
    'typedoc-images',
    'typedoc-hbs',
    'typedoc-styles',
    'typedoc-js'
]);

const TYPEDOC = {
    EXPORT_JSON_PATH: 'dist/igniteui-angular/docs/typescript-exported',
    PROJECT_PATH: 'projects/igniteui-angular/src',
    TEMPLATE_STRINGS_PATH: 'extras/template/strings/shell-strings.json',
    OUTPUT_PATH: './dist/igniteui-angular/docs/',
    REPO: {
        TRANSLATIONS_REPO_NAME: 'igniteui-angular-api-ja',
        TRANSLATIONS_REPO_LINK:  `https://github.com/IgniteUI/igniteui-angular-api-ja`
    }
}

gulp.task('typedoc-build:theme', ['typedoc-build'],
    shell.task(`typedoc ${TYPEDOC.PROJECT_PATH}`)
);

gulp.task('typedoc-build:export',
    shell.task(`typedoc ${TYPEDOC.PROJECT_PATH} --generate-json ${TYPEDOC.EXPORT_JSON_PATH}`)
);

gulp.task('typedoc-build:import', ['typedoc-build'],
    shell.task(`typedoc ${TYPEDOC.PROJECT_PATH} --generate-from-json ${TYPEDOC.EXPORT_JSON_PATH}`)
);

gulp.task('typedoc:clean-translations', () => { 
        del.sync(`${TYPEDOC.OUTPUT_PATH}/${TYPEDOC.REPO.TRANSLATIONS_REPO_NAME}`)
});

gulp.task('typedoc:create-output-path', () => {
    !fs.existsSync(TYPEDOC.OUTPUT_PATH) && fs.mkdirSync(TYPEDOC.OUTPUT_PATH);
});

gulp.task('typedoc:copy-translations', ['typedoc:clean-translations', 'typedoc:create-output-path'], 
    shell.task(`git -C ${TYPEDOC.OUTPUT_PATH} clone ${TYPEDOC.REPO.TRANSLATIONS_REPO_LINK}`)
);

gulp.task('typedoc:clean-docs-dir', () => {
    del.sync(`${TYPEDOC.OUTPUT_PATH}typescript`)
});

gulp.task('typedoc-build:doc:ja:localization', ['typedoc-build', 'typedoc:clean-docs-dir', 'typedoc:copy-translations'],
    shell.task(`typedoc ${TYPEDOC.PROJECT_PATH} --generate-from-json ${TYPEDOC.OUTPUT_PATH}/${TYPEDOC.REPO.TRANSLATIONS_REPO_NAME}/ja/ --templateStrings ${TYPEDOC.TEMPLATE_STRINGS_PATH} --localize jp`)
);

gulp.task('typedoc-serve', ['typedoc-watch'], () => {
    browserSync.init({
        server: './dist/igniteui-angular/docs/typescript'
    });

    gulp.watch('./dist/igniteui-angular/docs/typescript/**/*')
        .on('change', browserSync.reload);
});
