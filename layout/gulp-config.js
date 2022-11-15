const pkg = require('./package.json');
const dir = { src: 'src/', prod: 'production/', build: 'build/' }

module.exports = {
  pkg: {
    name: pkg.name,
  },
  data: {
    name: pkg.name,
    description: pkg.description,
    copyright: pkg.copyright,
    keywords: pkg.keywords
  },
  options: {
    server: {
      host: 'localhost',
      port: 3000
    },
    gulpSize: {
      showFiles: true,
    },
    minifyng: {
      html: {
        collapseWhitespace: true, 
        removeComments: true
      },
      styles: {
        compatibility: 'ie8', 
        level: { 1: { specialComments: 'no' } }
      },
      inlineStyles: { 
        compress: true 
      }
    },
    webpSupport: true,
    webp: {
      lossless: { lossless: true },
      lossy: { method: 6, quality: 90 }
    },
    prefixes: ['last 15 versions', '> 1%', 'ie 8', 'ie 7'],
  },
  paths: {
    prod: {
      html: dir.prod,
      js: dir.prod + 'js/',
      css: dir.prod + 'css/',
      img: dir.prod + 'images/',
      fonts: dir.prod + 'fonts/',
      icons: dir.src + 'images/',
      favicon: dir.prod
    },
    build: {
      html: dir.build,
      js: dir.build + 'js/',
      css: dir.build + 'css/',
      img: dir.build + 'images/',
      fonts: dir.build + 'fonts/',
      icons: dir.src + 'images/',
      favicon: dir.build,

      cssInit: './cached/'
    },
    src: {
      html: dir.src + '*.html',
      js: dir.src + 'js/main.js',
      css: dir.src + 'scss/main.scss',
      img: dir.src + 'images/**/*',
      fonts: dir.src + 'fonts/**/*.*',
      icons: dir.src + 'images/icons/*.png',
      favicon: dir.src + '*.ico',
      templates: dir.src,
      data: './cached/data.json'
    },
    watch: {
      html: dir.src + '**/*.html',
      js: dir.src + 'js/**/*.js',
      css: dir.src + 'scss/**/*.scss',
      img: dir.src + 'images/**/*',
      fonts: dir.src + 'fonts/**/*.*',
      icons: dir.src + 'images/icons/*',
      favicon: dir.src + '*.ico',
      data: dir.src + 'data/**/*.json',
      svgicon: dir.src + 'svg-icons/*.*'
    }
  }
}
