FROM node:8.15.0-alpine
LABEL maintainer "support@paladinarcher.com"

ENV PACKAGES bash mongodb openssh-client

RUN apk update && apk upgrade && \
	apk add $PACKAGES --no-cache && \
	rm -rf /var/cache/apk/*

RUN mkdir -p /data/db && \
	chown -R mongodb /data/db

RUN mongodb --version
