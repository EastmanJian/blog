#!/bin/sh -v
PORT=28411

#sync the blog source to VPS
rsync -zrtopgv -e "ssh -p $PORT" --delete --progress --exclude "_site" ./* eastman@eastmanjian.cn:/home/eastman/eastman_blog/
