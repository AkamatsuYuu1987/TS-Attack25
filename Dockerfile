FROM node:14.17.0
WORKDIR /srv/front/src/app

RUN npm install -g npm@latest
RUN npm install -g @vue/cli

CMD ["/bin/sh"]