# Etapa de construcción
FROM node:18 as build

WORKDIR /app

# Copiar dependencias y archivos de configuración
COPY package*.json ./

# Instalar dependencias del proyecto (incluye fullcalendar si está en package.json)
RUN npm install

# Copiar el resto del código fuente
COPY . .

# Construir la aplicación
RUN npm run build

# Etapa de producción
FROM nginx:alpine

# Copiar el resultado de la build al contenedor de nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copiar configuración personalizada de nginx si tienes una
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
