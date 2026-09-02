FROM node:lts-trixie-slim


COPY package*.json .

RUN npm ci

COPY . .

RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "dev"]

