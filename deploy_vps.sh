#!/bin/sh -v
PORT=28411

#build blog _site files
jekyll build

#sync _site files to VPS
rsync -zrtopgv -e "ssh -p $PORT" --delete --progress ./_site/* eastman@eastmanjian.cn:/srv/www/htdocs/blog/

