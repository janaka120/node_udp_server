FROM mhart/alpine-node
WORKDIR /usr/src/app

# COPY package*.json ./
# RUN npm install

COPY . .

EXPOSE 8126/udp
CMD ["npm", "start"]