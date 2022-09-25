FROM node:16 as build

COPY . .

RUN yarn
RUN yarn build

FROM node:16 as run

RUN mkdir /app
COPY --from=build /build /app/build
COPY --from=build .env.example /app/.env
COPY --from=build /package.json /app/package.json

WORKDIR /app
LABEL org.opencontainers.image.source=https://github.com/m2en/chikurima

CMD ["build/index.js"]
