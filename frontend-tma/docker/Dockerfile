FROM node:18 AS base

RUN mkdir -p /workspace/frontend-tma

WORKDIR /workspace/frontend-tma

FROM base AS build_frontend-tma

COPY ./my-app/package.json /workspace/frontend-tma/
COPY ./my-app/package-lock.json /workspace/frontend-tma/
RUN npm install

COPY ./my-app /workspace/frontend-tma/
RUN npm run build
# Copy source code
USER node
# Start the application
COPY --from=build /workspace/frontend-tma/dist ./dist

#CMD ["dist/index.js"]
#CMD ["node", "dist/index.js"]
CMD ["npm", "run", "start"]