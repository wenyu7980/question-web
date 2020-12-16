FROM nginx
MAINTAINER wenyu7980@163.com
RUN rm /etc/nginx/conf.d/default.conf
COPY dist/question/  /usr/share/nginx/html/
