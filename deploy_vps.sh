#!/bin/sh -v

#Run 'jekyll build' to generate _site files first before deplyment.
#pack and ship _site/* files to VPS lighttpd's document-root/blog
tar cvfz _site.tar.gz _site/
scp -P 28411 _site.tar.gz eastman@45.78.51.215:/srv/www/htdocs
rm _site.tar.gz
ssh -p 28411 eastman@45.78.51.215 << EOF 
  cd /srv/www/htdocs
  tar xvfz _site.tar.gz
  rm -rf blog/
  mv _site blog
  rm _site.tar.gz
EOF

