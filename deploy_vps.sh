#!/bin/sh 
#Deploy the Jekyll generated _site files to the VPS host's web server document root
#The client public key should be placed in the .ssh/authorized_keys for connection establishment.
#Use --resources or -r option to sync resources (images, movies, ...) file from jekyll source folder only.

START_TIMESTAMP=`date "+%Y-%m-%d %H:%M:%S"`
START_MSEC=`date +%s`

echo '-----Get the parameters from _config.yml-----'
HOST=$(grep '^vps_host:' _config.yml | awk 'BEGIN{FS=":"}{print $2}' | sed 's/^ *//g')
PORT=$(grep '^vps_ssh_port:' _config.yml | awk 'BEGIN{FS=":"}{print $2}' | sed 's/^ *//g')
USERNAME=$(grep '^vps_ssh_username:' _config.yml | awk 'BEGIN{FS=":"}{print $2}' | sed 's/^ *//g')
DES=$(grep '^vps_htdocs_root:' _config.yml | awk 'BEGIN{FS=":"}{print $2}' | sed 's/^ *//g')
BASEURL=$(grep '^baseurl:' _config.yml | awk 'BEGIN{FS="\""}{print $2}')

echo '-----deploy resources to cloud-----'
./cos_sync.sh

echo '-----sync blog files to linux folder-----'
rsync -zrtopgv --checksum --delete --progress --exclude-from rsync_exclude.txt /mnt/hgfs/Blog/eastman_blog ~/

echo '-----build blog _site files-----'
cd ~/eastman_blog
jekyll build --incremental 

echo '-----sync _site files or images to VPS-----'
if [ "$1" = "--resources" -o "$1" = "-r" ] ; then
  rsync -zrtopgv -e "ssh -p $PORT" --checksum --delete --progress ./resources $USERNAME@$HOST:$DES
else
  rsync -zrtopgv -e "ssh -p $PORT" --checksum --delete --progress ./_site/ $USERNAME@$HOST:$DES$BASEURL
fi

#echo '-----sync back _site files to windows folder-----'
#rsync -zrtopgv --checksum --delete --progress ~/eastman_blog/_site /mnt/hgfs/Blog/eastman_blog

cd -

END_TIMESTAMP=`date "+%Y-%m-%d %H:%M:%S"`
END_MSEC=`date +%s`

echo 'Start Time: ' $START_TIMESTAMP
echo 'End Time: ' $END_TIMESTAMP
DURATION_MSEC=`expr $END_MSEC - $START_MSEC`
echo 'Total Time Spent: ' `expr $DURATION_MSEC` 'seconds.'

