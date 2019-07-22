FROM alpine

ENV LIGHTTPD_VERSION=1.4.54-r0

RUN apk add --update --no-cache \
	lighttpd=${LIGHTTPD_VERSION} \
	lighttpd-mod_auth \
  && rm -rf /var/cache/apk/*



RUN touch /usr/local/bin/start.sh
RUN chmod +x /usr/local/bin/start.sh
RUN echo "#!/bin/sh"										>> /usr/local/bin/start.sh
RUN echo "chmod a+w /dev/pts/0" 							>> /usr/local/bin/start.sh
RUN echo "exec lighttpd -D -f /etc/lighttpd/lighttpd.conf " >> /usr/local/bin/start.sh

#Copy distributed contents generated from webpack
COPY ./dist/ /var/www/localhost/htdocs
COPY ./assets /var/www/localhost/htdocs/assets

#Copy self-signed certificates to lighttpd
COPY ./cert/server.* /etc/ssl/certs/
RUN cat /etc/ssl/certs/server.crt /etc/ssl/certs/server.key > /etc/ssl/certs/localhost.pem

RUN echo 'server.port = 443' >> /etc/lighttpd/lighttpd.conf
RUN echo 'ssl.engine = "enable"' >> /etc/lighttpd/lighttpd.conf
RUN echo 'ssl.pemfile = "/etc/ssl/certs/localhost.pem"' >> /etc/lighttpd/lighttpd.conf

RUN sed -i '/server.modules =/a "mod_openssl",' /etc/lighttpd/lighttpd.conf

EXPOSE 443
CMD ["start.sh"]
