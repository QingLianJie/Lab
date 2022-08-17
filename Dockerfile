FROM caddy:2-alpine

COPY build/Caddyfile /etc/caddy/Caddyfile

WORKDIR /var/www
COPY app/ .
