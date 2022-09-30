FROM node:18 as build

COPY . .

RUN yarn
RUN yarn build

FROM node:18.10-alpine as run

RUN mkdir /app
COPY --from=build /build /app/build
COPY --from=build .env.example /app/.env
COPY --from=build /node_modules /app/node_modules
COPY --from=build /package.json /app/package.json

WORKDIR /app
LABEL org.opencontainers.image.source=https://github.com/m2en/chikurima

CMD ["build/index.js"]
