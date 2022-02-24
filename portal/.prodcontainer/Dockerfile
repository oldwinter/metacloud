FROM node:17.4.0-bullseye as builder
COPY . /temp
WORKDIR /temp/
RUN rm -rf node_modules
RUN npm install && npm run build

FROM nginx:1.21.6-alpine
COPY .prodcontainer/nginx/conf.d/my.conf /etc/nginx/conf.d/my.conf
COPY --from=builder /temp/dist /usr/share/nginx/html
# RUN cat /etc/nginx/nginx.conf
# RUN cat /etc/nginx/conf.d/my.conf
# RUN ls -al /usr/share/nginx/html