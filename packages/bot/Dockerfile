FROM node:lts as base

WORKDIR /app

COPY . ./

RUN corepack enable
RUN corepack install

RUN pnpm install

CMD pnpm start
