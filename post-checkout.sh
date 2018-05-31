#!/bin/bash

# get the branch name
branch=$(git rev-parse --abbrev-ref HEAD)

# dynamically build .gitignore
printf "" > .gitignore
echo "# This file is dynamically generated. To edit the list of ignored items, edit post-checkout.sh, save, and rerun npm run setup." >> .gitignore
echo ".DS_Store" >> .gitignore
echo "node_modules" >> .gitignore
echo ".tmp" >> .gitignore
echo ".gitignore" >> .gitignore

# if the branch is not named master append the "not-master" text
if [[ "$branch" != "master" ]]; then
    echo "builds/" >> .gitignore
fi
