# Dockerfile para Frontend React
FROM node:20-alpine

# Define diretório de trabalho
WORKDIR /app

# Copia arquivos de dependências
COPY package*.json ./
COPY pnpm-lock.yaml* ./

# Instala pnpm globalmente
RUN npm install -g pnpm

# Instala dependências
RUN pnpm install

# Copia código da aplicação
COPY . .

# Expõe porta
EXPOSE 3000

# Define variáveis de ambiente
ENV REACT_APP_API_URL=http://backend:5001

# Comando para iniciar aplicação em modo desenvolvimento
CMD ["pnpm", "run", "dev", "--host", "0.0.0.0", "--port", "3000"]

