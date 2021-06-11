FROM mhart/alpine-node
WORKDIR /usr/src/app
COPY . .

EXPOSE 8125/udp
CMD ["npm", "start"]
