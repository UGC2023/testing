FROM node:10.11.0-alpine
RUN yarn global add lerna
RUN mkdir /app
WORKDIR /app
COPY package.json .
RUN yarn
COPY packages/main ./packages/main
COPY packages/tools ./packages/tools
COPY packages/ds-user ./packages/ds-user
COPY packages/ds-myapps ./packages/ds-myapps
COPY lerna.json .
RUN apk add --no-cache --virtual .gyp \
        python \
        make \
        g++ \
        git \
    && lerna bootstrap \
    && apk del .gyp
EXPOSE 4000
CMD ["node", "packages/main"]

