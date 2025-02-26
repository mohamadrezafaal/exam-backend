FROM node:18.12.0-alpine as builder

WORKDIR /app

COPY ./node_modules.zip /app

RUN unzip node_modules.zip && rm node_modules.zip

COPY ./ /app

RUN npm run build

FROM node:18.12.0-alpine

WORKDIR /app

COPY --from=builder /app/node_modules ./node_modules

COPY --from=builder /app/keys ./keys

COPY --from=builder /app/.env ./.env

COPY --from=builder /app/assets ./assets

COPY --from=builder /app/dist ./dist


ENV DB_URL localhost

ENV DB_PORT 5432

ENV DB_DATABASE Hrm_Req

ENV DB_USERNAME postgres

ENV DB_PASSWORD postgres

ENV CREATE_DB  false

ENV OAUTH_BACKEND_URL https://localhost:3000/api

ENV BACKEND_URL https://localhost:3001

ENV FRONT_URL https://localhost:8081/#/

ENV Excel_BACKEND http://localhost:3012

ENV FILE_MANAGER_BACKEND_URL  http://localhost:3006

ENV SYSTEM_ID 1

ENV CACHE_TTL 0


CMD ["node", "dist/main"]
