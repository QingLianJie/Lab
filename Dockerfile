FROM caddy:2-alpine

COPY build/Caddyfile /etc/caddy/Caddyfile
COPY dist/ /var/www/