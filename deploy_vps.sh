#!/bin/sh -v
#Deploy the Jekyll generated _site files to the VPS host's web server document root
#The client public key should be placed in the .ssh/authorized_keys for connection establishment.
#Use --images or -i option to sync images files from jekyll source folder only.


#Get the parameters from _config.yml
HOST=$(grep 'vps_host:' _config.yml | awk 'BEGIN{FS=":"}{print $2}' | sed 's/^ *//g')
PORT=$(grep 'vps_ssh_port:' _config.yml | awk 'BEGIN{FS=":"}{print $2}' | sed 's/^ *//g')
USERNAME=$(grep 'vps_ssh_username:' _config.yml | awk 'BEGIN{FS=":"}{print $2}' | sed 's/^ *//g')
DES=$(grep 'vps_htdocs_root:' _config.yml | awk 'BEGIN{FS=":"}{print $2}' | sed 's/^ *//g')
BASEURL=$(grep 'baseurl:' _config.yml | awk 'BEGIN{FS="\""}{print $2}')

#build blog _site files
jekyll build

#sync _site files or images to VPS
if [ "$1" = "--images" -o "$1" = "-i" ] ; then
  rsync -zrtopgv -e "ssh -p $PORT" --delete --progress ./images $USERNAME@$HOST:$DES$BASEURL
else
  rsync -zrtopgv -e "ssh -p $PORT" --delete --progress ./_site/* $USERNAME@$HOST:$DES$BASEURL
fi


