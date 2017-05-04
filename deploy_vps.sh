tar cvfz _site.tar.gz _site/
scp -P 28411 _site.tar.gz root@45.78.51.215:/srv/www/htdocs
ssh -p 28411 root@45.78.51.215 tar xvfz /srv/www/htdocs/_site.tar.gz
ssh -p 28411 root@45.78.51.215 rm -rf /srv/www/htdocs/blog
ssh -p 28411 root@45.78.51.215 mv _site /srv/www/htdocs/blog
ssh -p 28411 root@45.78.51.215 rm -f /srv/www/htdocs/_site.tar.gz
rm -f _site.tar.gz