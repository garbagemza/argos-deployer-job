FROM balenalib/raspberrypi3-alpine-node:14.19
RUN apk update
RUN apk add git

WORKDIR /app
COPY package.json package-lock.json ./

RUN npm ci --prod

COPY . .

CMD [ "node", "index.js" ]