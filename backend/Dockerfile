FROM node:18-alpine as builder

WORKDIR /app

COPY package.json yarn.lock ./

COPY uploads ./uploads

RUN yarn install

COPY . .

RUN yarn build

FROM node:18-alpine

WORKDIR /app

COPY package.json yarn.lock ./

RUN yarn install --production

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/uploads ./uploads

EXPOSE 3000

CMD ["node", "dist/main"]
