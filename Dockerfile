FROM httpd:2.4-alpine
#Copy distributed contents generated from webpack
COPY ./dist/ /usr/local/apache2/htdocs/
COPY ./assets /usr/local/apache2/htdocs/assets

#Copy self-signed certificates to apache
COPY ./cert /usr/local/apache2/conf/

#Modify httpd.conf to include ssl
RUN sed -i \
        -e 's/^#\(Include .*httpd-ssl.conf\)/\1/' \
        -e 's/^#\(LoadModule .*mod_ssl.so\)/\1/' \
        -e 's/^#\(LoadModule .*mod_socache_shmcb.so\)/\1/' \
        conf/httpd.conf
		
RUN sed -i -e 's/www.example.com/localhost/g' conf/extra/httpd-ssl.conf
 