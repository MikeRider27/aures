FROM node:20.11.0

WORKDIR /app

COPY ./frontend/package*.json ./
RUN npm install

ENV APP_ENV=${APP_ENV}
ENV APP_DEV_API_URL=${APP_DEV_API_URL}
ENV APP_PROD_API_URL=${APP_PROD_API_URL}

EXPOSE 3000

# Monta el directorio de la aplicación como volumen
VOLUME /app

# Ejecuta el comando de desarrollo de Next.js
CMD ["npm", "run", "dev"]