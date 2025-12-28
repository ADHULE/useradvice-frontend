# syntax=docker/dockerfile:1.19.0

FROM node:25.2.1-alpine

WORKDIR /app

RUN addgroup app && adduser -S -G app app

COPY package*.json ./

RUN npm install

COPY --chown=app:app . .

# Corrige les permissions pour node_modules
RUN mkdir -p /app/node_modules && chown -R app:app /app/node_modules

USER app

EXPOSE 3002

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]
