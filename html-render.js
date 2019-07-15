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
const registerButtonSectionHelper = () => {
  handlebars.registerHelper('printButtonHeader', (element, type, light, color, wide, slim,text, icon) =>{
    const headerH21 = '<h2>Solid</h2><h3>Button Elements</h3><div class="button-group">';
    const headerH22 = '</div><h2>Hollow</h2><h3>Button Elements</h3><div class="button-group">';
    const headerH23 = '</div><h2>Bar</h2><h3>Button Elements</h3><div class="button-group">';
    const headerH24 = '</div><h2>Icon</h2><h3>Button Elements</h3><div class="button-group">';
    const headerH25 = '</div><h2>Opaque</h2><h3>Button Element</h3><div class="button-group" style="background-image:url(\'https://placeimg.com/767/300/nature\'); background-size:cover; background-position:top center;">';
    const headerH26 = '</div><h2>Light</h2>' + 
                      '<p>Modifying the button with "light" will ensure that the chosen button works on a black or darker-colored background, if applicable.</p>' +
                      '<h3>Light, Solid</h3><h4>Button Elements</h4>' +
                      '<div class="button-group">';
    const headerH31 = '</div><h3>Button Elements</h3><div class="button-group">';
    const headerH32 = '</div><h3>Anchor Elements</h3><div class="button-group">';
    const headerH322 = '</div><h3>Anchor Elements</h3><div class="button-group" style="background-image:url(\'https://placeimg.com/767/300/nature\'); background-size:cover; background-position:top center;">';
    const headerH33 = '</div><h3>Light, Solid</h3><h4>Button Elements</h4><div class="button-group">';
    const headerH34 = '</div><h3>Light, Hollow</h3><h4>Button Elements</h4><div class="button-group">';
    const headerH35 = '</div><h3>Light, Bar</h3><h4>Button Elements</h4><div class="button-group">';
    const headerH36 = '</div><h3>Light, Opaque</h3><h4>Button Element</h4><div class="button-group" style="background-image:url(\'https://placeimg.com/767/300/nature\'); background-size:cover; background-position:top center;">';
    const headerH37 = '</div><h3>Default</h3><div class="button-group">'
    const headerH41 = '</div><h4>Button Elements</h4><div class="button-group">';
    const headerH42 = '</div><h4>Anchor Elements</h4><div class="button-group">';
    const headerH422 = '</div><h4>Anchor Element</h4><div class="button-group" style="background-image:url(\'https://placeimg.com/767/300/nature\'); background-size:cover; background-position:top center;">';
    if(!light && !wide && !slim){
      if (type === "default" && element === "button" && color ===""){
        return new handlebars.SafeString(headerH21);
      } else if (type === "default" && element === "anchor" && color ===""){
        return new handlebars.SafeString(headerH32);
      } else if (type === "hollow" && element === "button" && color ===""){
        return new handlebars.SafeString(headerH22);
      } else if (type === "hollow" && element === "anchor" && color ===""){
        return new handlebars.SafeString(headerH32);
      } else if (type === "bar" && element === "button" && color ===""){
        return new handlebars.SafeString(headerH23);
      } else if (type === "bar" && element === "anchor" && color ===""){
        return new handlebars.SafeString(headerH32);
      } else if (type === "icon" && element === "button" && color ===""){
        return new handlebars.SafeString(headerH24);
      } else if (type === "icon" && element === "anchor" && color ===""){
        return new handlebars.SafeString(headerH32);
      } else if (type === "opaque" && element === "button" && color ===""){
        return new handlebars.SafeString(headerH25);
      } else if (type === "opaque" && element === "anchor" && color ===""){
        return new handlebars.SafeString(headerH322);
      }
    }else if(light && !wide && !slim){
      if (type === "default" && element === "button" && color ===""){
        return new handlebars.SafeString(headerH26);
      } else if (type === "default" && element === "anchor" && color ===""){
        return new handlebars.SafeString(headerH42);
      } else if (type === "hollow" && element === "button" && color ===""){
        return new handlebars.SafeString(headerH34);
      } else if (type === "hollow" && element === "anchor" && color ===""){
        return new handlebars.SafeString(headerH42);
      } else if (type === "bar" && element === "button" && color ===""){
        return new handlebars.SafeString(headerH35);
      } else if (type === "bar" && element === "anchor" && color ===""){
        return new handlebars.SafeString(headerH42);
      } else if (type === "opaque" && element === "button" && color ===""){
      return new handlebars.SafeString(headerH36);
    } else if (type === "opaque" && element === "anchor" && color ===""){
      return new handlebars.SafeString(headerH422);
    } 
    }
  }) 
}
const registerButtonLayoutClassHelper = () => {
  handlebars.registerHelper('printButtonLayoutHeader', (element, type, light, color, wide, slim, icon) =>{
    const headerH27 = '</div><h2>Layout Options</h2>' + 
    '<h3>Default</h3>' +
    '<p>By default, a button\'s width is based on its content, with its maximum with being the width of its container.</p>' +
    '<p>Resize the width of the container below to view how a button acts with different container sizes.</p>' +
    '<h4>Button Elements</h4>' +
    '<div class="button-group border">';
    const headerH38 = '</div><h3>Wide</h3>'+ 
                      '<p>You can also implement the "wide" modifier to ensure that the button uses the full width of its container.</p>' +
                      '<p>Resize the width of the container below to view how a wide button acts with different container sizes.</p>' +
                      '<h4>Button Element</h4><div class="button-group border">';
    const headerH39 = '</div><h3>Slim</h3>' + 
    '<p>You can also implement the "slim" modifier to decrease the overall size of the button.</p>' +
    '<h4>Button Elements</h4><div class="button-group">';
    const headerH423 = '</div><h4>Anchor Elements</h4><div class="button-group border">';
    const headerH424 = '</div><h4>Anchor Elements</h4><div class="button-group">';


    if(!light && !wide && !slim &&!icon && type === "default" && element === "button" && color ===""){
      return new handlebars.SafeString(headerH27);
    }else if (!light && !wide && !slim &&!icon && type === "default" && element === "anchor" && color ===""){
      return new handlebars.SafeString(headerH423);
    }else if(!light && wide && !slim &&!icon && type === "default" && element === "button" && color ===""){
      return new handlebars.SafeString(headerH38);
    }else if(!light && wide && !slim &&!icon && type === "default" && element === "anchor" && color ===""){
      return new handlebars.SafeString(headerH423);
    }else if(!light && !wide && slim &&!icon && type === "default" && element === "button" && color ===""){
      return new handlebars.SafeString(headerH39);
    }else if(!light && !wide && slim &&!icon && type === "default" && element === "anchor" && color ===""){
      return new handlebars.SafeString(headerH424);
    }

    }) 
}
const registerButtonClassHelper = () => {
  handlebars.registerHelper('buttonClass', (type, color, light, wide, slim) =>{
    const button = "button";
    let buttonType = "button-" + type;
    let buttonColor = "button-" + color;
    let buttonLight = "button-light";
    let buttonWide = "button-wide";
    let buttonSlim = "button-slim";
    if (type === "default"){
      if(color !==""){
        if(light){
          return button + " " + buttonColor +  " " + buttonLight;
        
        }else if(wide){
          return button + " " + buttonColor + " " + buttonWide;
        }else if(slim){
          return button + " " + buttonColor + " " + buttonSlim;
        }else{
          return button + " " + buttonColor;
        }       
      }else{
        if(light){
          return button + " " + buttonLight;
        }else if(wide){
          return button + " " + buttonWide;
        }else if(slim){
          return button + " " + buttonSlim;
        }else{
          return button;
        }
      }      
    }else{
      if(color !==""){
        if(light){
          return button + " " + buttonType + " " + buttonColor +  " " + buttonLight;
        }else if(wide){
          return button + " " + buttonType + " " + buttonColor + " " + buttonWide;
        }else if(slim){
          return button + " " + buttonType + " " + buttonColor + " " + buttonSlim;
        }else{
          return button + " " + buttonType + " " + buttonColor;
        }       
      }else{
        if(light){
          return button + " " + buttonType + " " + buttonLight;
        }else if(wide){
          return button + " " + buttonType + " " + buttonWide;
        }else if(slim){
          return button + " " + buttonType + " " + buttonSlim;
        }else{
          return button + " " + buttonType;
        }
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
registerButtonClassHelper()
registerButtonSectionHelper()
registerButtonLayoutClassHelper();

compileViews(filesObjViews)

