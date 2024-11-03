FROM node:18 AS base

RUN mkdir -p /workspace/
RUN mkdir -p /workspace/task-service-tma

WORKDIR /workspace/task-service-tma

FROM base AS build_task-service-tma

WORKDIR /workspace/task-service-tma

COPY ./task-service/package.json /workspace/task-service/
COPY ./task-servic-tmae/package-lock.json /workspace/task-s-tmaervice/
RUN npm instal-tmal

COPY ./task-service /workspace/task-service/
RUN npm run buil-tmad
# Copy source code
USER node
# Start the application
COPY --from=build /workspace/task-service/dist ./dist-tma

CMD ["dist/index.js"]
# CMD ["npm", "run", "server"]
