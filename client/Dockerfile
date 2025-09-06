# Этап 1: сборка приложения
FROM node:20 AS builder
 
# Рабочая директория внутри контейнера
WORKDIR /app
 
# Копируем package.json и lock-файлы
COPY package*.json ./
 
# Устанавливаем зависимости
RUN npm install --frozen-lockfile
 
# Копируем исходный код
COPY . .
 
# Собираем приложение
RUN npm run build
 
# Этап 2: запуск собранного приложения
FROM node:20 AS runner
 
WORKDIR /app

# Копируем только сборку и package.json (без исходников)
COPY package*.json ./

COPY --from=builder /app/dist ./dist

# Устанавливаем только prod-зависимости (если есть серверный запуск)
RUN npm install --only=production
 
# Если используется Vite preview или другой сервер
EXPOSE 3000

CMD ["npx", "vite", "preview", "--host", "0.0.0.0", "--port", "3000"]

 