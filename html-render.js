const handlebars = require('handlebars');
const fs = require('fs');
const pretty = require('pretty');

// const template = fs.readFileSync('src/html/pageRender.handlebars', 'utf8');
// const compiledTemplate = handlebars.compile(template);

// fs.readdir('src/html/views', 'utf8', (err, files) => {
//   if (err) throw err;
//   const views = files;
//   const components = fs.readdirSync('src/html/components', 'utf8');
//   const globals = fs.readdirSync('src/html/globals', 'utf8');

//   handlebars.registerHelper(
//     'addClass',
//     (value, compare, className) => (!handlebars.Utils.isEmpty(value) && value === compare ? ` ${className}` : ''),
//   );
//   components.forEach((partial) => {
//     const partialName = `${partial.replace(/\.[^./]+$/, '')}`;
//     const partialContent = fs.readFileSync(`src/html/partials/${partial}`, 'utf8');
//     handlebars.registerPartial(partialName, partialContent);
//   });
//   globals.forEach((partial) => {
//     const partialName = `${partial.replace(/\.[^./]+$/, '')}`;
//     const partialContent = fs.readFileSync(`src/html/globals/${partial}`, 'utf8');
//     handlebars.registerPartial(partialName, partialContent);
//   });
//   svgPartials.forEach((partial) => {
//     const partialName = `${partial.replace(/\.[^./]+$/, '')}`;
//     const partialContent = fs.readFileSync(`src/html/svg_partials/${partial}`, 'utf8');
//     handlebars.registerPartial(partialName, partialContent);
//   });

//   views.forEach((view) => {
//     const outputFileName = `${view.replace(/\.[^./]+$/, '')}.html`;
//     const viewJSON = JSON.parse(fs.readFileSync(`src/html/views/${view}`, 'utf8'));
//     const compiled = compiledTemplate(viewJSON);
//     const finalOut = pretty(compiled, { ocd: true });
//     fs.writeFileSync(`new_builds/html/${outputFileName}`, finalOut);
//   });
// });

const recursiveRead = (dir) => {
  let results = []

  const items = fs.readdirSync(dir)

  for (const item of items) {

    if (item.indexOf('.handlebars') === -1) {
      let newDirPath = `${dir}/${item}`

      const recursResults = readComponents(newDirPath)
      results = [...results, ...recursResults]
    } else {
      results.push(item)
    }
  }

  return results
}

console.log(recursiveRead('src/html/components'))


