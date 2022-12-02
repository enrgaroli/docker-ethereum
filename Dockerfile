# Usamos el nodo alpine como imagen base
FROM node:8.12-alpine

WORKDIR /app

# Instala los prerequisitos para instalar la web3 y otros paquetes de ethereum npm
RUN apk update && apk upgrade && apk add bash git openssh
RUN apk add --update python2 krb5 krb5-libs gcc make g++ krb5-dev

RUN git config --global url."https://".insteadOf git://

COPY ./package.json .

# Installamos las dependencias
RUN npm install

COPY . .

# Selecciona el comando por defecto
CMD ["npm","start"]