#!/bin/bash

# Script de inicialização rápida do Sistema de Simulados AWS
# Uso: ./start.sh

echo "🚀 Iniciando Sistema de Simulados AWS..."
echo ""

# Verifica se Docker está instalado
if ! command -v docker &> /dev/null; then
    echo "❌ Docker não encontrado. Por favor, instale o Docker primeiro."
    echo "   https://docs.docker.com/get-docker/"
    exit 1
fi

# Verifica se Docker Compose está instalado
if ! command -v docker-compose &> /dev/null; then
    echo "❌ Docker Compose não encontrado. Por favor, instale o Docker Compose primeiro."
    echo "   https://docs.docker.com/compose/install/"
    exit 1
fi

# Para serviços existentes
echo "🛑 Parando serviços existentes..."
docker-compose down 2>/dev/null

# Mata processos nas portas se necessário
echo "🔧 Liberando portas..."
lsof -ti:3000 2>/dev/null | xargs kill -9 2>/dev/null || true
lsof -ti:5001 2>/dev/null | xargs kill -9 2>/dev/null || true

# Inicia serviços
echo "🔨 Construindo e iniciando serviços..."
docker-compose up --build -d

# Aguarda serviços ficarem prontos
echo "⏳ Aguardando serviços ficarem prontos..."
sleep 10

# Verifica se serviços estão rodando
if curl -s http://localhost:5001/api/certifications > /dev/null; then
    echo "✅ Backend rodando em http://localhost:5001"
else
    echo "❌ Erro ao iniciar backend"
    docker-compose logs backend
    exit 1
fi

if curl -s http://localhost:3000 > /dev/null; then
    echo "✅ Frontend rodando em http://localhost:3000"
else
    echo "⚠️  Frontend ainda inicializando..."
fi

echo ""
echo "🎉 Sistema iniciado com sucesso!"
echo ""
echo "📱 Acesse: http://localhost:3000"
echo "🔧 API: http://localhost:5001"
echo ""
echo "📋 Comandos úteis:"
echo "   docker-compose logs -f    # Ver logs"
echo "   docker-compose down       # Parar serviços"
echo "   docker-compose restart    # Reiniciar"
echo ""
echo "🎓 Boa sorte com seus estudos para AWS!"

# Abre navegador automaticamente (opcional)
if command -v xdg-open &> /dev/null; then
    echo "🌐 Abrindo navegador..."
    xdg-open http://localhost:3000 2>/dev/null &
elif command -v open &> /dev/null; then
    echo "🌐 Abrindo navegador..."
    open http://localhost:3000 2>/dev/null &
fi

