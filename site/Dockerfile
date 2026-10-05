# syntax=docker/dockerfile:1

# ── Build: type-check and render static HTML ─────────────────────────────
FROM node:22-alpine AS build
WORKDIR /app
ENV ASTRO_TELEMETRY_DISABLED=1
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
ARG GIT_SHA=local
ARG BUILD_DATE
ENV GIT_SHA=$GIT_SHA BUILD_DATE=$BUILD_DATE
RUN npx astro check && npx astro build

# ── Runtime: plain nginx, no Node in production ──────────────────────────
FROM nginx:alpine AS runtime
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html
HEALTHCHECK --interval=30s --timeout=3s --start-period=20s --start-interval=1s CMD wget -qO- http://127.0.0.1/healthz >/dev/null || exit 1
