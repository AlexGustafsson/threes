FROM node:14-buster as builder

WORKDIR /etc/threes

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

FROM node:14-buster

WORKDIR /etc/threes

COPY package*.json ./

RUN npm install --only=production

COPY --from=builder /etc/threes/dist dist

EXPOSE 3000

CMD ["npm", "start"]
