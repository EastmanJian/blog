#!/bin/sh -vx
#sync the jekyll site source to the target host.
#The client public key should be placed in the .ssh/authorized_keys for connection establishment.

#Get the parameters from _config.yml
HOST=$(grep 'vps_host:' _config.yml | awk 'BEGIN{FS=":"}{print $2}' | sed 's/^ *//g')
PORT=$(grep 'vps_ssh_port:' _config.yml | awk 'BEGIN{FS=":"}{print $2}' | sed 's/^ *//g')
USERNAME=$(grep 'vps_ssh_username:' _config.yml | awk 'BEGIN{FS=":"}{print $2}' | sed 's/^ *//g')
DES=$(grep 'vps_jekyll_site:' _config.yml | awk 'BEGIN{FS=":"}{print $2}' | sed 's/^ *//g')

#sync the blog source to VPS
rsync -zrtopgv -e "ssh -p $PORT" --delete --progress --exclude "_site" ./ $USERNAME@$HOST:$DES
