FROM node:18-alpine

ARG HOST DEPLOY_ENV 
ENV HOST=${HOST} DEPLOY_ENV=$DEPLOY_ENV 


ENV PORT ${FRONTEND_PORT}
ENV NODE_ENV=development

# Create app directory
RUN mkdir -p /usr/app/frontend
WORKDIR /usr/app/frontend

# Installing dependencies
# Copying source files
COPY . .

# # Installing dependencies
RUN npm install -g pnpm
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm fetch --frozen-lockfile
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store pnpm install --frozen-lockfile


# Building app
ENV NODE_ENV=production
RUN pnpm build
EXPOSE ${FRONTEND_PORT}


# TODO: optimize - multi stage build


# Running the app
CMD ["pnpm","start"]