FROM node:20.17.0

WORKDIR /app

COPY package*.json ./
RUN npm install --no-cache

COPY . .

RUN npm run build

EXPOSE 5173

CMD ["npm", "run", "dev", "--", "--host", "0.0.0.0"]