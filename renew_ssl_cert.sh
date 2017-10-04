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

#install the cert into glassfish server
cd /srv/glassfish4/glassfish/domains/domain1/config
keytool -delete -alias LetsEncrypt -keystore cacerts.jks -storepass $(echo "c2N1dHNjdXQK" | openssl base64 -d)
keytool -delete -alias letsencryptim -keystore cacerts.jks -storepass $(echo "c2N1dHNjdXQK" | openssl base64 -d)
keytool -delete -alias s1as -keystore keystore.jks -storepass $(echo "c2N1dHNjdXQK" | openssl base64 -d)
keytool -import -v -trustcacerts -alias LetsEncrypt -file /etc/letsencrypt/live/eastmanjian.cn/fullchain.pem -keystore cacerts.jks -storepass $(echo "c2N1dHNjdXQK" | openssl base64 -d)
keytool -import -v -trustcacerts -alias letsencryptim -file /etc/letsencrypt/live/eastmanjian.cn/chain.pem -keystore cacerts.jks -storepass $(echo "c2N1dHNjdXQK" | openssl base64 -d)
openssl pkcs12 -export -inkey /etc/letsencrypt/live/eastmanjian.cn/privkey.pem -in /etc/letsencrypt/live/eastmanjian.cn/fullchain.pem -name s1as -out test.p12 -passout pass:$(echo "c2N1dHNjdXQK" | openssl base64 -d)
keytool -importkeystore -srckeystore test.p12 -srcstoretype pkcs12 -destkeystore keystore.jks -destkeypass $(echo "c2N1dHNjdXQK" | openssl base64 -d) -srckeypass $(echo "c2N1dHNjdXQK" | openssl base64 -d)

