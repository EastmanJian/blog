#!/bin/sh -vx
#This script need to run on VPS host. 
#It is to renew the Let's Encrypt HTTPS(SSL) cert (pem file) using the Certbot tool.
#   ref: https://certbot.eff.org/#centos6-other
#
# Let's Encrypt's cert will expire every 3 month. Configure this script in a cron job for schedule running.
#   e.g. configure cron job with following config line using conrtab 'crontab -u root -e'
#            59 1 1 1,4,7,10 * /home/eastman/eastman_blog/renew_ssl_cert.sh
#        It runs on every 1st of Jan,Apr,Jul,Oct, 1:59 AM.


#renew the cert (use --dry-run to simulate the renewal without really writing to file)
#/usr/sbin/certbot-auto renew --dry-run
/usr/sbin/certbot-auto renew

#make the lighttpd pem file
cp /etc/letsencrypt/live/eastmanjian.cn/privkey.pem /etc/lighttpd/eastman_host.pem
cat /etc/letsencrypt/live/eastmanjian.cn/cert.pem >> /etc/lighttpd/eastman_host.pem
