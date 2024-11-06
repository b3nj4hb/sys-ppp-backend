# Etapa base
FROM oven/bun:1 AS base
WORKDIR /usr/src/app

# Etapa de instalación de dependencias
FROM base AS install
RUN mkdir -p /temp/dev
COPY package.json /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

# Instalar solo dependencias de producción
RUN mkdir -p /temp/prod
COPY package.json /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile --production

# Copiar node_modules desde la instalación anterior
FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . . 

# Ejecutar el compilador TypeScript
# RUN bun run tsc

# Compilar la aplicación
RUN bun run build

# Etapa de producción: solo copio lo necesario para el contenedor final
FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /usr/src/app/dist ./dist 
COPY --from=prerelease /usr/src/app/package.json ./package.json
COPY --from=prerelease /usr/src/app/public/swagger-dark.css ./public/swagger-dark.css
COPY --from=prerelease /usr/src/app/.env ./.env

# Exponer el puerto y definir el entrypoint
USER bun
EXPOSE 3000/tcp
ENTRYPOINT [ "bun", "run", "dist/main.js" ]
