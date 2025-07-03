# Etapa 1: Compilar la app con Vite
FROM node:22 AS build

# Establece el directorio de trabajo
WORKDIR /app

# Copia package.json y package-lock.json
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código fuente
COPY . .

# Compila la aplicación
RUN npm run build


# Etapa 2: Servir la app con NGINX
FROM nginx:stable-alpine

# Copia archivos de compilación al directorio público de NGINX
COPY --from=build /app/dist /usr/share/nginx/html

# Reemplaza la configuración por defecto de NGINX
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expone el puerto 80
EXPOSE 80

# Comando por defecto
CMD ["nginx", "-g", "daemon off;"]
