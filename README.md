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
*The following instructions only apply to those using Gulp.js for workflow management.*

### Commands
```
gulp
```
1. deletes everything the `/builds/development/` directory
2. builds HTML and **expanded** CSS with sourcemaps to `/builds/development/*`
3. starts a local server, using `/builds/development/` as the base directory
4. initiates a live reload, that refreshes pages upon a change to the HTML or CSS (SASS)

```
NODE_ENV=production gulp
```
1. deletes everything in the `/builds/production/` directory
2. builds HTML and **compressed** CSS with to `/builds/production/*`
3. starts a local server, using `/builds/production/` as the base directory
4. initiates a live reload, that refreshes pages upon a change to the HTML or CSS (SASS)

```
gulp zip
```
1. deletes everything in the `/builds/production/` directory
2. builds HTML and **compressed** CSS with to `/builds/production/*`
3. places a zipped version of the `/builds/production/` directory in `/builds/` named `vX.X.X` to be renamed based on the version of the build