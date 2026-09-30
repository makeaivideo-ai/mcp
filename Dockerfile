# Runs the MakeAIVideo stdio MCP server (a bridge to https://mcp.makeaivideo.ai).
# Set MAKEAIVIDEO_API_KEY (mav_...) to call tools. Without a key the server
# still starts and answers initialize and tools/list, so it can be inspected.
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json tsconfig.json ./
RUN npm ci --ignore-scripts
COPY src ./src
RUN npm run build

FROM node:22-alpine
WORKDIR /app
ENV NODE_ENV=production
COPY package.json package-lock.json ./
RUN npm ci --omit=dev --ignore-scripts && npm cache clean --force
COPY --from=build /app/dist ./dist
COPY tools.json ./
USER node
ENTRYPOINT ["node", "dist/index.js"]
