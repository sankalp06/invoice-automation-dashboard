# ── Stage 1: Build ───────────────────────────────────────────────────────────
FROM node:18-alpine AS builder

WORKDIR /app

COPY package.json ./

RUN npm install --legacy-peer-deps

COPY . .

# Prevent warnings from failing the build
ENV CI=false

# Faster build, smaller image
ENV GENERATE_SOURCEMAP=false

RUN npm run build

# ── Stage 2: Serve ───────────────────────────────────────────────────────────
FROM nginx:stable-alpine

COPY --from=builder /app/build /usr/share/nginx/html

# Custom nginx config to support client-side routing
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]