FROM node:14

WORKDIR /usr/src/app



COPY package*.json ./

# RUN rm -rf node_modules && \
RUN mkdir
RUN npm install
## RUN npm run build -- --no-cache

COPY . .

EXPOSE 8080

CMD [ "npm", "run", "serve" ]
# CMD ["/bin/sh"]
