#!/bin/sh -v

#pack and ship the blog source to VPS
cd ..
tar cvfz eastman_blog.tar.gz eastman_blog/
scp -P 28411 eastman_blog.tar.gz eastman@45.78.51.215:/home/eastman
rm eastman_blog.tar.gz
ssh -p 28411 eastman@45.78.51.215 << EOF 
  cd /home/eastman
  rm -rf eastman_blog/
  tar xvfz eastman_blog.tar.gz
  rm eastman_blog.tar.gz
EOF
cd -
