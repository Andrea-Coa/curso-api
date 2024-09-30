FROM node:slim
COPY package*.json ./
WORKDIR /app
COPY . .
RUN npm ci --only=production
CMD ["npm", "start"]