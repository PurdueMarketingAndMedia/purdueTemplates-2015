# Purdue University Templates - 2015
Contained in this project are the main templates created and maintained by Purdue Marketing and Media (PMM).

## Making Suggestions
PMM is open to any suggestions. If you wish to make a suggestion, feel free to [open an issue](https://github.com/PurdueMarketingAndMedia/purdueTemplates-2015/issues/new) or email us at [online@purdue.edu](mailto:online@purdue.edu) to let us know.

## Contributing
If you wish to contribute to development, please [open an issue](https://github.com/PurdueMarketingAndMedia/purdueTemplates/issues/new) or email us at [online@purdue.edu](mailto:online@purdue.edu) to let us know what you intend to change.

Feel free to fork this repository and make any changes. Once you have completed your changes, make a pull request so that we can consider merging them.

**Please keep in mind that PMM is under no obligation to accept pull requests.** 

## Getting Started
### Download
If you are only wanting to download the final production files, simply [download the master branch](https://github.com/PurdueMarketingAndMedia/purdueTemplates-2015/archive/master.zip). Once the download has completed, your desired files can be found in the *production* folder.

To contribute to the templates, [fork this project](https://help.github.com/articles/fork-a-repo/) and link your local repo to the copy.

To only use this project as a base for your own, simply [clone this repo](https://help.github.com/articles/cloning-a-repository/) into your own local repo.

### Setup
This project was setup to use [Gulp.js](http://gulpjs.com/), which runs on [Node.js](https://nodejs.org/en/), for workflow management. If you wish contribute to the project, please use these tools. Otherwise, feel free to use any tools you desire.

1. Install [Node.js](https://nodejs.org/en/download/)
2. Once Node.js is installed, install Gulp.js globally by entering the following into your command console:

   ```
   npm install -g gulp
   ```

3. After Gulp.js has been installed globally, you'll need to locally install the project dependencies. Navigate to your repo's base folder in the command console and enter:

   ```
   npm install
   ```

## Development

### Branches

Before making any changes, please review this repository's [branching model](https://github.com/PurdueMarketingAndMedia/purdueTemplates-2015/wiki/Branching-Model). When adding, updating, or deleting a feature, you will most likely be creating a [feature branch](https://github.com/PurdueMarketingAndMedia/purdueTemplates-2015/wiki/Feature-Branches) or a [maintenance branch](https://github.com/PurdueMarketingAndMedia/purdueTemplates-2015/wiki/Maintenance-Branches) (hotfix).

If you're making a small fix/update that needs to be applied to the master branch in a timely manner, use a [maintenance branch](https://github.com/PurdueMarketingAndMedia/purdueTemplates-2015/wiki/Maintenance-Branches) (hotfix). If this is a larger update that can/will be shipped with other features, use a [feature branch](https://github.com/PurdueMarketingAndMedia/purdueTemplates-2015/wiki/Feature-Branches).

If you're unsure, contact the team by creating an [issue](https://github.com/PurdueMarketingAndMedia/purdueTemplates-2015/issues) with the "Question" label or email [online@purdue.edu](mailto:online@purdue.edu).

### Commands

*The following instructions only apply to those using Gulp.js for workflow management.*

```
gulp
```
1. builds HTML and **expanded** CSS with sourcemaps to `/builds/development/*`
2. builds HTML and **compressed** CSS to `/builds/production/*`
3. starts a local server, using `/builds/development/` as the base directory
4. initiates a live reload, that refreshes pages upon a change to the HTML or CSS (SASS)

### Directory Structure

- **/builds** : all automatically compiled HTML and CSS files. _You will most likely not directly edit files in this folder._

	- **/development** : stores the development version of compiled files _(most notably, expanded CSS and sourcemaps)_
		
		- **/templates** : the final HTML files generated from the `/components/html/templates`
		- **/css** : the expanded CSS files and their sourcemaps

	- **/production** : stores the production version of compiled files _(most notably, compressed CSS)_

		- **/templates** : the final HTML files generated from the `/components/html/templates`
		- **/css** : the minified CSS files

- the source files used to generate the final HTML and CSS. _This is where you would make all your edits._

	- **/css** : the SCSS and CSS files used to compile the final CSS files in `/builds`

		- **/audience** : styles specific to the audience page template
		- **/blank** : styles specific to the blank page template
		- **/bootstrap** : all SCSS files used in Bootstrap
		- **/college** : styles specific to the college page template
		- **/content** : styles specific to the content page template
		- **/deptOffice** : styles specific to the department/office page template
		- **/events** : styles specific to the events page template
		- **/fontAwesome** : all SCSS files used in FontAwesome
		- **/global** : styles used on all page templates
		- **/mixins** : various SCSS mixins used across templates
		- **/partials** : various SCSS partials used across templates

	- **/html** : the HTML templates and modules used to generate whole pages in `/builds`. _Final HTML files are generated using [gulp-file-include](https://www.npmjs.com/package/gulp-file-include)._

		- **/modules** : all HTML files that are imported by various templates

			- **/content-audience** : HTML partials specific to the audience page template
			- **/content-blank** : HTML partials specific to the blank page template
			- **/content-college** : HTML partials specific to the college page template
			- **/content-content** : HTML partials specific to the content page template
			- **/content-deptOffice** : HTML partials specific to the department/office page template
			- **/content-events** : HTML partials specific to the events page template
			- **/content-patterns** : HTML partials specific to the pattern pages
			- **/footer** : HTML partials used in the footer of each page
			- **/head** : HTML partials used in `<head>` element of each page
			- **/header** : HTML partials used in the header of each page
			- **/navigation** : HTML partials used for navigation in each page
			- **/patterns** : HTML partials used for generating our patterns (buttons, accordions, etc.)

		- **/templates** : HTML files that import files from the `/components/html/modules` folder to create a final page in the `/builds` folder.

			- **/patterns** : templates used to contain our pattern examples