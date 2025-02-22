# Build environment
FROM node:18 as builder
WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build --prod

# Production environment
FROM nginx:alpine
COPY ./default.conf /etc/nginx/conf.d/
COPY --from=builder /usr/src/app/dist/day32w-purchase-order/browser /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
