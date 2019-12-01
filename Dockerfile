FROM node:10.12.0-alpine
# Upgrade and install apk pacages
RUN apk --no-cache --update upgrade && \
    apk --no-cache --update add curl ca-certificates && \
    update-ca-certificates

RUN mkdir -p /home/node/app

WORKDIR /home/node/app

COPY ./. /home/node/app

RUN npm install

RUN apk add --no-cache openssl

CMD ["npm", "start"]