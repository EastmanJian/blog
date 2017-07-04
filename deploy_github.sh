#!/bin/sh -v

#The current tree should be tracking with GitHub repo 'blog' with two branches, master and gh-pages.
#   master   --> source files with Jekyll structure.
#   gh-pages --> generated static website files

#make sure it's on master branch 
git checkout master
if [ $? -ne 0 ]; then
    exit 1
fi

#make sure master branch is clean
git status | grep clean
if [ $? -ne 0 ]; then
    exit 1
fi
 

#Run 'jekyll build' to generate _site files first before deplyment.
jekyll build

#backup the files under _site
cp -rf _site/ /tmp/

#switch working tree to gh-pages branch and refresh the files with the latest _site files backup above
git checkout gh-pages
if [ $? -ne 0 ]; then
    exit 1
fi
rm -r ./*
cp -r /tmp/_site/* ./

#deply to github
git add -A
git commit -m "deploy blog"
git push origin gh-pages

#switch back to master branch
git checkout master

#clean up
rm -r /tmp/_site/
