FROM node:18.1.0-alpine
RUN apk add xsel python3 make g++
WORKDIR /unopad
COPY ./unopad .
EXPOSE 3000
RUN npm install --force
RUN npm run build
RUN npm install -g serve
CMD ["serve", "-s", "-n", "build"]