# build stage
FROM node:14.17.3-alpine as build-stage
WORKDIR /app
COPY package*.json .

RUN apk add --update python3 make g++ && rm -rf /var/cache/apk/*
RUN npm install

COPY . .

# Get build argument and set environment variable
ARG ACCOUNT_SERVICE
ENV REACT_APP_ACCOUNT_SERVICE=$ACCOUNT_SERVICE

ARG QUIZ_SERVICE
ENV REACT_APP_QUIZ_SERVICE=$QUIZ_SERVICE

ARG REDIRECT_URL
ENV REACT_APP_REDIRECT_URL=$REDIRECT_URL

RUN npm run build

# production stage
FROM nginx:stable-alpine as production-stage

# Copy configuration for nginx, to prevent 404 error when refresh
COPY --from=build-stage /app/reverse_proxy.conf /etc/nginx/conf.d/default.conf

# Set working directory to nginx asset directory
WORKDIR /usr/share/nginx/html
# Remove default nginx static assets
RUN rm -rf ./*

# Copy static assets from builder stage
COPY --from=build-stage /app/build .

EXPOSE 5000

# Containers run nginx with global directives and daemon off
CMD ["nginx", "-g", "daemon off;"]
