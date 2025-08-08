#Etapa construccion

# Dockerfile para construir y ejecutar una aplicación Vue.js con Nginx
# Utiliza una imagen de Node.js para construir la aplicación y luego Nginx para servirla aplicación estática

# From Node.js para construir la aplicación
# Utiliza la versión 23 de Node.js basada en Alpine para un tamaño reducido
FROM node:23-alpine AS builder

# Establece el directorio de trabajo dentro del contenedor
# Este es el directorio donde se copiarán los archivos de la aplicación
WORKDIR /app

# Copia los archivos de configuración del paquete y las dependencias
# Esto incluye package.json y package-lock.json o yarn.lock
COPY package*.json ./

# Instala las dependencias de la aplicación
# Esto instalará todas las dependencias necesarias para construir la aplicación
RUN npm install

# Copia el resto de los archivos de la aplicación al contenedor
# Esto incluye el código fuente, archivos de configuración, etc.
COPY . .

# Construye la aplicación Vue.js
# Este comando compila la aplicación y genera los archivos estáticos en el directorio dist
RUN npm run build


#Etapa de produccion

# Desde la imagen de Nginx para servir la aplicación estática
# Utiliza la versión estable de Nginx basada en Alpine para un tamaño reducido

# From nginx:stable-alpine
# Esta imagen se utiliza para servir los archivos estáticos generados por la etapa de construcción
FROM nginx:stable-alpine

# Establece el directorio de trabajo dentro del contenedor Nginx
# Este es el directorio donde Nginx buscará los archivos estáticos para servir
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copia el archivo de configuración de Nginx personalizado al contenedor
# Este archivo define cómo Nginx servirá los archivos estáticos y manejará las rutas
EXPOSE 80

# Comando para ejecutar Nginx en primer plano
# Esto es necesario para que el contenedor se mantenga en ejecución
CMD ["nginx", "-g", "daemon off;"]
