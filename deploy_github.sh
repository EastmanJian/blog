#!/bin/sh -v

#The current tree should be tracking with GitHub repo 'blog' with two branches, master and gh-pages.
#   master   --> source files with Jekyll structure.
#   gh-pages --> generated static website files
#Run 'jekyll build' to generate _site files first before deplyment.

#backup the files under _site
cp -r _site/ /tmp/

#switch working tree to gh-pages branch and refresh the files with the latest _site files backup above
git checkout gh-pages
rm -r ./*
cp -r /tmp/_site/* ./
rm -r /tmp/_site/

#deply to github
git add -A
git commit -m "deploy blog"
git push origin gh-pages

#switch back to master branch
git checkout master
