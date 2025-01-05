FROM node:lts AS base

WORKDIR /app

COPY . .

RUN corepack enable
RUN corepack install

RUN pnpm install
RUN pnpm build

ENV HOST=0.0.0.0
ENV PORT=4321

EXPOSE 4321

CMD ["pnpm", "start"]
