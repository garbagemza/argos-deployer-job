FROM arm64v8/node:14.19-alpine3.14
RUN apk update
RUN apk add git

WORKDIR /app
COPY package.json package-lock.json ./

RUN npm install --prod

COPY . .

CMD [ "node", "index.js" ]