FROM caddy:2-alpine

RUN ls -al

COPY dist/ /var/www/
COPY build/Caddyfile /etc/caddy/Caddyfile