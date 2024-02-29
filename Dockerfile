# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
# FROM oven/bun:1 as base
# WORKDIR /usr/src/app

# # install dependencies into temp directory
# # this will cache them and speed up future builds
# FROM base AS install
# RUN mkdir -p /temp/dev
# COPY package.json bun.lockb /temp/dev/
# RUN cd /temp/dev && bun install 

# # install with --production (exclude devDependencies)
# RUN mkdir -p /temp/prod
# COPY package.json bun.lockb /temp/prod/

# # copy node_modules from temp directory
# # then copy all (non-ignored) project files into the image
# FROM install AS prerelease
# COPY --from=install /temp/dev/node_modules ..
# COPY package.json bun.lockb /temp/dev/
# COPY . .
# RUN bun run build

FROM imbios/bun-node:18-slim AS deps
ARG DEBIAN_FRONTEND=noninteractive

# I use Asia/Jakarta as my timezone, you can change it to your timezone
RUN apt-get -y update && \
  apt-get install -yq openssl git ca-certificates tzdata && \
  ln -fs /usr/share/zoneinfo/Asia/Jakarta /etc/localtime && \
  dpkg-reconfigure -f noninteractive tzdata
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json bun.lockb ./
# RUN bun install --frozen-lockfile

# Build the app
FROM deps AS builder
WORKDIR /src
COPY . .

RUN bun run build


# Production image, copy all the files and run next
FROM node:18-slim AS runner
WORKDIR /src

ARG CONFIG_FILE
COPY $CONFIG_FILE /.env
ENV NODE_ENV production

# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

COPY --from=builder  /.next/standalone ./

EXPOSE 3001

ENV PORT 3001

ENTRYPOINT ["npm", "start"]
# CMD ["node", "server.js"]
