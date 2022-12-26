FROM node:16-alpine
WORKDIR /app
COPY BE/package.json ./
COPY BE/tsconfig.json ./
COPY BE/src ./src
RUN ls -a
RUN npm install --force
EXPOSE 3001
CMD ["npm","run","dev"]
