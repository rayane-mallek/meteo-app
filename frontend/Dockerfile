# Étape de build
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build -- --configuration production

# Étape d'exécution
FROM nginx:alpine
# Ajoutez cette ligne pour créer l'utilisateur nginx
RUN adduser -D -H nginx2

# Corrigez cette ligne - elle copie incorrectement les fichiers
COPY --from=build . /usr/share/nginx/html
# Votre fichier nginx.conf doit être séparé du Dockerfile
COPY nginx.conf /etc/nginx/conf.d/default.conf
