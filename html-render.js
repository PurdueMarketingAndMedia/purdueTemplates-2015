const handlebars = require('handlebars');
const fs = require('fs');
const path = require('path')
const pretty = require('pretty');

const recursiveRead = (dir, ext) => {
  let results = {}

  const items = fs.readdirSync(dir)

  for (const item of items) {

    if (item.indexOf(ext) === -1) {
      let newDirPath = `${dir}/${item}`

      const recursResults = recursiveRead(newDirPath, ext)
      results = {...results, ...recursResults}
    } else {
      results[`${dir}/${item}`] = item
    }
  }

  return results
}

// console.log(recursiveRead('src/html/components'))

const registerAllPartials = (filesObj) => {
  for (file in filesObj) {
    const partialName = filesObj[file].replace(/\.[^./]+$/, '');
    const partialContent = fs.readFileSync(file, 'utf8');
    handlebars.registerPartial(partialName, partialContent);
  }
}

const registerAccordionSectionHelper = () => {
  handlebars.registerHelper('printHeader', (header, striped) =>{
    const header1 = '<h2>Striped</h2>';
    const header2 = '<h2>Available Colors</h2>';
    if (header === "Default"){
      if(striped){
        return new handlebars.SafeString(header1);
      }else{
        return new handlebars.SafeString(header2);
      }      
    }
  }) 
}

const registerEqualsHelper = () => {
  handlebars.registerHelper('equals', (left, right, options) => {
    if (arguments.length < 3) 
      throw new Error("Equals helper requires 2 parameters.")

    if (left != right) {
      return options.inverse(this)
    } else {
      return options.fn(this)
    }
  })
}

const compileViews = (filesObj) => {
  const template = fs.readFileSync('src/html/pageRender.handlebars', 'utf8');
  const compiledTemplate = handlebars.compile(template);
  const isDev = process.env.NODE_ENV === 'development'
  for (file in filesObj) {
    console.log(file)
    const outName = isDev ? `new_builds${file.replace('src', '').replace('.json', '.html').replace('/views', '')}` : `new_builds/production${file.replace('src', '').replace('.json', '.html').replace('/views', '')}`
    const viewJSON = JSON.parse(fs.readFileSync(file, 'utf8'));
    const compiled = compiledTemplate(viewJSON);
    const finalOut = pretty(compiled, { ocd: true });
    fs.mkdirSync(path.dirname(outName), {recursive: true})
    fs.writeFileSync(outName, finalOut, {flag: 'w'})
  }
}

const filesObjComponents = recursiveRead('src/html/components', '.handlebars')
const filesObjGlobals = recursiveRead('src/html/globals', '.handlebars')
const filesObjViews = recursiveRead('src/html/views', '.json')
registerAllPartials(filesObjComponents)
registerAllPartials(filesObjGlobals)
registerAccordionSectionHelper();
registerEqualsHelper()

compileViews(filesObjViews)

