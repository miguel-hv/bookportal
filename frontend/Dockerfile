# ------------------------------
# Base image
# ------------------------------
FROM node:18-alpine AS base
WORKDIR /app
COPY package*.json ./

# ------------------------------
# Development stage
# ------------------------------
FROM base AS dev
RUN npm install
CMD ["npm", "run", "dev"]

# ------------------------------
# Build stage
# ------------------------------
FROM base AS build
RUN npm install
COPY . .
RUN npm run build

# ------------------------------
# Production stage
# ------------------------------
FROM node:18-alpine AS prod
WORKDIR /app
COPY --from=build /app/package*.json ./
COPY --from=build /app/.next ./.next
COPY --from=build /app/public ./public
RUN npm install --production
EXPOSE 3000
CMD ["npm", "start"]
