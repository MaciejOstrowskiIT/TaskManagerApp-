FROM node:18 AS base

RUN mkdir -p /workspace/
RUN mkdir -p /workspace/user-service-tma

WORKDIR /workspace/user-service-tma

FROM base AS build_user-service-tma

WORKDIR /workspace/user-service-tma

COPY ./user-service-tma/package.json /workspace/user-service-tma/
COPY ./user-service-tma/package-lock.json /workspace/user-service-tma/
RUN npm install

COPY ./user-service-tma /workspace/user-service-tma/
RUN npm run build
# Copy source code
USER node
# Start the application
COPY --from=build /workspace/user-service-tma/dist ./dist

CMD ["dist/index.js"]
# CMD ["npm", "run", "server"]
