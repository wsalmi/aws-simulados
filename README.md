# Sistema de Simulados AWS

Sistema completo de simulados para certificações AWS com interface web moderna e explicações detalhadas.

## 🚀 Execução Rápida com Docker

### Pré-requisitos
- Docker
- Docker Compose

### Iniciando o Sistema

1. **Clone ou baixe os arquivos do projeto**

2. **Execute o sistema completo:**
```bash
docker-compose up --build
```

3. **Acesse a aplicação:**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5001

### Comandos Úteis

```bash
# Iniciar em background
docker-compose up -d --build

# Ver logs
docker-compose logs -f

# Parar serviços
docker-compose down

# Rebuild completo
docker-compose down && docker-compose up --build

# Limpar volumes (reset banco de dados)
docker-compose down -v && docker-compose up --build
```

## 🛠️ Execução Manual (Desenvolvimento)

### Backend (Flask)

```bash
cd aws-simulados-api
python -m venv venv
source venv/bin/activate  # Linux/Mac
# ou
venv\Scripts\activate     # Windows

pip install -r requirements.txt
python unified_seed_database.py --reset
python src/main.py
```

### Frontend (React)

```bash
cd aws-simulados
pnpm install
pnpm run dev
```

## 📋 Funcionalidades

### ✅ Implementado
- **4 Certificações AWS** configuradas
- **Sistema de simulados** com cronômetro
- **Questões reais** baseadas nos exames oficiais
- **Explicações detalhadas** para cada resposta
- **Pontuação oficial** (escala 100-1000)
- **Resultados por domínio** do exame
- **Interface responsiva** para desktop e mobile
- **Navegação entre questões** com marcação
- **Banco de dados** SQLite com persistência

### 🎯 Certificações Suportadas

1. **AWS Certified Cloud Practitioner (CLF-C02)**
   - 65 questões | 90 minutos | Mín: 700 pontos
   - ✅ Questões implementadas

2. **AWS Certified AI Practitioner (AIF-C01)**
   - 65 questões | 90 minutos | Mín: 700 pontos
   - 🔄 Estrutura criada

3. **AWS Certified Solutions Architect Associate (SAA-C03)**
   - 65 questões | 130 minutos | Mín: 720 pontos
   - 🔄 Estrutura criada

4. **AWS Certified Solutions Architect Professional (SAP-C02)**
   - 75 questões | 180 minutos | Mín: 750 pontos
   - 🔄 Estrutura criada

## 🗂️ Estrutura do Projeto

```
├── docker-compose.yml          # Orquestração dos serviços
├── README.md                   # Este arquivo
│
├── aws-simulados-api/          # Backend Flask
│   ├── Dockerfile
│   ├── requirements.txt
│   ├── unified_seed_database.py # Seeding unificado do banco
│   ├── DATABASE_SEEDING_GUIDE.md # Guia de seeding
│   ├── old_scripts_backup/    # Scripts antigos (backup)
│   └── src/
│       ├── main.py            # Aplicação principal
│       ├── models/            # Modelos de dados
│       └── routes/            # Rotas da API
│
└── aws-simulados/             # Frontend React
    ├── Dockerfile
    ├── package.json
    ├── vite.config.js
    └── src/
        ├── App.jsx            # Componente principal
        └── components/        # Componentes UI
```

## 🔧 Configuração

### Variáveis de Ambiente

**Backend (.env):**
```env
FLASK_ENV=development
FLASK_DEBUG=1
DATABASE_URL=sqlite:///src/database/app.db
```

**Frontend (.env):**
```env
REACT_APP_API_URL=http://localhost:5001
```

### Portas Utilizadas
- **3000**: Frontend React
- **5001**: Backend Flask API

## 📊 API Endpoints

### Certificações
- `GET /api/certifications` - Lista certificações
- `GET /api/questions/{certification}` - Questões por certificação

### Simulados
- `POST /api/simulation/start` - Inicia simulado
- `GET /api/simulation/{id}` - Dados do simulado
- `POST /api/simulation/{id}/submit` - Submete respostas
- `GET /api/simulation/{id}/results` - Resultados detalhados

### Estatísticas
- `GET /api/stats/{certification}` - Estatísticas da certificação

## 🎓 Como Usar

1. **Selecione uma certificação** na página inicial
2. **Configure o simulado** (nome, número de questões)
3. **Responda as questões** com cronômetro ativo
4. **Marque questões** para revisão se necessário
5. **Finalize o simulado** e veja os resultados
6. **Revise explicações** detalhadas de cada questão
7. **Analise performance** por domínio do exame

## 🔄 Expansão

### Adicionando Questões

```python
# Exemplo de script para adicionar questões
question = {
    'certification': 'CLF-C02',
    'domain': 'Cloud Concepts',
    'question_text': 'Sua questão aqui...',
    'question_type': 'multiple_choice',  # ou 'multiple_response'
    'options': ['Opção A', 'Opção B', 'Opção C', 'Opção D'],
    'correct_answers': [1],  # Índices das respostas corretas
    'explanation': 'Explicação detalhada...',
    'difficulty': 'medium'
}
```

### Novas Certificações

1. Adicione na lista de certificações em `simulation.py`
2. Crie questões com o código da certificação
3. Configure domínios específicos da certificação

## 🐛 Troubleshooting

### Problemas Comuns

**Porta em uso:**
```bash
docker-compose down
lsof -ti:3000 | xargs kill -9
lsof -ti:5001 | xargs kill -9
```

**Banco de dados corrompido:**
```bash
docker-compose down -v
docker-compose up --build
```

**Problemas de CORS:**
- Verifique se o backend está rodando na porta 5001
- Confirme configuração de proxy no vite.config.js

## 📝 Licença

Este projeto é para fins educacionais e de preparação para certificações AWS.

## 🤝 Contribuição

Para adicionar mais questões ou melhorias:
1. Adicione questões seguindo o formato estabelecido
2. Teste localmente com Docker Compose
3. Verifique explicações detalhadas e precisas

---

**Boa sorte com suas certificações AWS! 🎯**

