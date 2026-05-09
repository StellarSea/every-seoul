FROM node:22-alpine AS build

WORKDIR /app

ENV HUSKY=0

RUN corepack enable

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .

RUN pnpm build

FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
COPY docker-entrypoint.d/10-runtime-config.sh /docker-entrypoint.d/10-runtime-config.sh
RUN chmod +x /docker-entrypoint.d/10-runtime-config.sh

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
