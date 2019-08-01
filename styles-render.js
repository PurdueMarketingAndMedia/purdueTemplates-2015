const sass = require('node-sass')
const fs = require('fs');
const path = require('path')
const autoprefixer = require('autoprefixer')
const prefixer = autoprefixer({grid: true})
const postcss = require('postcss')

const recursiveRead = (dir) => {
  let results = {}

  const items = fs.readdirSync(dir)

  for (const item of items) {

    if (item.indexOf('.scss') === -1) {
      let newDirPath = `${dir}/${item}`

      const recursResults = recursiveRead(newDirPath)
      results = {...results, ...recursResults}
    } else {
      results[`${dir}/${item}`] = item
    }
  }

  return results
}

const compileSass = (filesObj) => {
  const isDev = process.env.NODE_ENV === 'development'
  for (file in filesObj) {
    const out = isDev ? `new_builds${file.replace('src', '').replace('.scss', '.css').replace('/finals', '')}` :  `new_builds/production${file.replace('src', '').replace('.scss', '.css').replace('/finals', '')}`
    const result = sass.renderSync({
      file: file,
      outputStyle: 'compressed',
      outFile: out,
      sourceMap: isDev
    })
    postcss([prefixer]).process(result.css, {from: undefined}).then(result => {
      fs.mkdirSync(path.dirname(out), {recursive: true})
      fs.writeFileSync(out, result.css, {flag: 'w'})
    })
  }
}

const filesObj = recursiveRead('src/styles/finals')
compileSass(filesObj)
