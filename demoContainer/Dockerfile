FROM keymetrics/pm2:latest-alpine

# 801634106000.dkr.ecr.eu-west-1.amazonaws.com/node-8-alpine-base:8.5.0-alpine

# install and upgrade packages
RUN apk --no-cache --update upgrade && \
    apk --no-cache --update add curl ca-certificates && \
    update-ca-certificates

# Create the app directory
#RUN mkdir -p /home/node/app
RUN mkdir -p /home/node/app/dist && chown -R node.node /home/node/app/dist

# Switch working directory
WORKDIR /home/node/app

# Copy app directory
COPY /. /home/node/app/

# Switch to the node user
USER node
#USER root

# Run the app
CMD ["npm", "start"]
