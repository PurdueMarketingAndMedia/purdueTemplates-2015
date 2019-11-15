# Purdue University Templates - 2015
*[Github pages](https://purduemarketingandmedia.github.io/purdueTemplates-2015/builds/production/html/mm/templates/audience.html)* 

Contained in this project are the main templates created and maintained by Purdue Marketing and Media (PMM).

If you have problems or trouble following any directions below, please contact us at [online@purdue.edu](mailto:online@purdue.edu).

## Suggestions and Contributing
We're open to any suggestions or contributions. If you wish to make a suggestion or have a contribution idea, feel free to [open an issue](https://github.com/PurdueMarketingAndMedia/purdueTemplates-2015/issues/new) or email us at [online@purdue.edu](mailto:online@purdue.edu) to let us know.

You can also feel free to fork this repository and make any changes. Once you have completed your changes, make a pull request so that we can consider merging them.

**Please keep in mind that PMM is under no obligation to accept pull requests.**

## Getting Started

If you wish to just download the production template files, they are included on the master branch. Simply [download the master branch](https://github.com/PurdueMarketingAndMedia/purdueTemplates-2015/archive/master.zip) and find the files in `/builds/production`

To only use this project as a base for your own, simply [clone this repo](https://help.github.com/articles/cloning-a-repository/) into your own local repo.

### Tools

We use:

- [Handlebars](https://handlebarsjs.com/) for HTML templating, 
- [Scss (Sass)](https://sass-lang.com/) for writing our styles, 
- [Babel](https://babeljs.io/) for compiling modern Javascript to browser-compatible Javascript, 
- [Browsers List](https://github.com/browserslist/browserslist) to codify current browser support,
- [Webpack](https://webpack.js.org/) as our main build tool.

### Setup
This project uses npm scripts for development workflow and for production builds. To get started, you'll just need to install [Node.js](https://nodejs.org/en/download/) to your machine.

Once Node is installed and after you have cloned or downloaded the repo to your machine, you'll need to install all the required npm packages by navigating to the directory where you cloned or downloaded the repo in your terminal and run:

```
npm i
```

Once all required packages are finished installing, you should be ready to follow steps outlined in the Development and Production Build sections below.

### Branches

Before making any changes, please review this repository's [branching model](https://github.com/PurdueMarketingAndMedia/purdueTemplates-2015/wiki/Branching-Model). When adding, updating, or deleting a feature, you will most likely be creating a [feature branch](https://github.com/PurdueMarketingAndMedia/purdueTemplates-2015/wiki/Feature-Branches) or a [maintenance branch](https://github.com/PurdueMarketingAndMedia/purdueTemplates-2015/wiki/Maintenance-Branches) (hotfix).

If you're making a small fix/update that needs to be applied to the master branch in a timely manner, use a [maintenance branch](https://github.com/PurdueMarketingAndMedia/purdueTemplates-2015/wiki/Maintenance-Branches) (hotfix). If this is a larger update that can/will be shipped with other features, use a [feature branch](https://github.com/PurdueMarketingAndMedia/purdueTemplates-2015/wiki/Feature-Branches).

If you're unsure, contact the team by creating an [issue](https://github.com/PurdueMarketingAndMedia/purdueTemplates-2015/issues) with the "Question" label or email [online@purdue.edu](mailto:online@purdue.edu).

## Development

To run the development environment for the templates, navigate to the directory where you cloned the repo in your terminal and run:

```
npm run dev
```

This will compile HTML, CSS and JS files into the `/builds` directory then launch a localhost environment. The script will also watch for any updates to `.scss`, `.js`, `.handlebars`, or `.json` (used by handlebars under `/src/html/views`) files under the `/src` directory and automatically refresh any instances of the localhost environment when an update occurs.

## Production Build

To build the production files of the templates, which includes minified javascript and css, run:

```
npm run prod
```

This compiles all files into the `/builds/production` directory.

### Directory Structure

- **/builds**: Compiled HTML, JS, and CSS files. _You should not directly edit files in this folder._

	- **/html**: Development HTML files
	- **/styles**: Development CSS files
	- **/js**: Development JS files

	- **/production**: Compiled production HTML, JS, and CSS files.

		- **/html**: Production HTML files
		- **/styles**: Production CSS files
		- **/js**: Production JS files

-  **/src**: Source files used to generate the final HTML, JS, and CSS. _This is where you would make all your edits._

	- **/styles**: the SCSS files used to compile the final CSS files in `/builds`

		- **/components/mm**: where all scss files are contained, separated into folders based on the [ITCSS Principle](https://www.xfive.co/blog/itcss-scalable-maintainable-css-architecture/)
		- **/finals/mm/templates**: the final scss files for each template and example page

	- **/html**: the Handlebars partials and views used to generate html files in `/builds`.

		- **/components/mm/templates**: Page templates and directories that include partials specific to certain templates.

			- **/accordion**: partials specific to the accordion page
			- **/audience**: partials specific to the audience template page
			- **/college**: partials specific to the college template page
			- **/content**: partials specific to the content template page

			- **/content-accordion.handlebars**: handlebars partial used as main template for an example page showing the accordion component
			- **/content-audience.handlebars**: handlebars partial used as main template for the audience page template
			- **/content-blank.handlebars**: handlebars partial used as main template for the blank page template
			- **/content-button.handlebars**: handlebars partial used as main template for an example page showing the button component
			- **/content-college.handlebars**: handlebars partial used as main template for the college page template
			- **/content-content.handlebars**: handlebars partial used as main template for the content page template
			- **/content-office.handlebars**: handlebars partial used as main template for the department/office page template
			- **/content-typography.handlebars**: handlebars partial used as main template for an example page showing the typography

		- **/globals**: general handlebars partials used for many or all templates or that aren't specific to a single template

			- **/mm/templates**: partials used globally throughout our templates
			- **/svg_partials**: svg partials to be used anywhere applicable

		- **/views/mm/templates**: handlebars use json files to determine which html files to build. The json holds information specific to the template file that it renders
			- **/college**: college template example pages
			- **/components**: web components example pages
			- **/office**: department/office template example pages
			- **audience.json**: audience template example page
			- **blank.json**: blank template example page
			- **content.json**: content template example page
		
		- **/pageRender.handlebars**: the highest level handlebars partial that every view uses to render html files

	- **/js/mm**: the javascript files used globally in our templates
		
		- **/global**: individual js files for different functions
		- **/main.js**: the final js build file. This is where to include global js files
