# Usamos el nodo alpine como imagen base
FROM node:12-alpine as build

WORKDIR /app

COPY ./package.json .

# Instalamos las dependencias
RUN npm install --silent

# Realizamos la copia del la carpeta cliente 
COPY . .

RUN npm run build

FROM nginx:1.21.6-alpine

COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]