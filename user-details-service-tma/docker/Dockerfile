FROM node:18 AS base

RUN mkdir -p /workspace/
RUN mkdir -p /workspace/user-details-service-tma

WORKDIR /workspace/user-details-service-tma

FROM base AS build_user-details-service-tma

WORKDIR /workspace/user-details-service-tma

COPY ./user-details-service-tma/package.json /workspace/user-details-service-tma/
COPY ./user-details-service-tma/package-lock.json /workspace/user-details-service-tma/
RUN npm install

COPY ./user-details-service-tma /workspace/user-details-service-tma/
RUN npm run build
# Copy source code
USER node
# Start the application
COPY --from=build /workspace/user-details-service-tma/dist ./dist

CMD ["dist/index.js"]
# CMD ["npm", "run", "server"]
