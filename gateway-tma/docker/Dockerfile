FROM node:18 AS base

RUN mkdir -p /workspace/
RUN mkdir -p /workspace/gateway-tma

WORKDIR /workspace/gateway-tma

FROM base AS build_gateway-tma

WORKDIR /workspace/gateway-tma

COPY ./gateway-tma/package.json /workspace/gateway-tma/
COPY ./gateway-tma/package-lock.json /workspace/gateway-tma/
RUN npm install

COPY ./gateway-tma /workspace/gateway-tma/
RUN npm run build
# Copy source code
USER node
# Start the application
COPY --from=build /workspace/gateway-tma/dist ./dist

CMD ["dist/index.js"]
# CMD ["npm", "run", "server"]
