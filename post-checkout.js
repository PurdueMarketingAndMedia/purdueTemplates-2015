var shell = require('shelljs');

// get the branch name
var branch = shell.exec('git rev-parse --abbrev-ref HEAD', {silent:true}).stdout;

// overwrite contents of .gitignore and post-checkout hook
shell.ShellString('').to('./.gitignore');
shell.ShellString('').to('./.git/hooks/post-checkout');

// dynamically build .gitignore
// message to user
var msg = "# This file is dynamically generated. To edit the list of ignored items, edit post-checkout.js, save, and rerun `npm run setup`.";

// add the message
shell.ShellString(msg + '\n\n').toEnd('./.gitignore');

// array of files/dirs to ignore
var defaults = ['.DS_Store', 'node_modules', '.tmp', '.gitignore'];

// add each element in defaults to .gitignore
defaults.forEach(function(element) {
    shell.ShellString(element + '\n').toEnd('./.gitignore');
});

// also ignore 'builds/' if the branch is not 'master'
if (branch !== "master") {
    shell.ShellString('builds/' + '\n').toEnd('./.gitignore');
}
