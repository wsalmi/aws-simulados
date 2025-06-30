import { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate, useParams, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button.jsx'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.jsx'
import { Badge } from '@/components/ui/badge.jsx'
import { BookOpen, Clock, Trophy, Target, ArrowRight } from 'lucide-react'
import './App.css'

// Componente principal
function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/certification/:code" element={<CertificationPage />} />
          <Route path="/simulation/:sessionId" element={<SimulationPage />} />
          <Route path="/results/:sessionId" element={<ResultsPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  )
}

// Página inicial com lista de certificações
function HomePage() {
  const [certifications, setCertifications] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCertifications()
  }, [])

  const fetchCertifications = async () => {
    try {
      const response = await fetch('/api/certifications')
      const data = await response.json()
      setCertifications(data)
    } catch (error) {
      console.error('Erro ao carregar certificações:', error)
    } finally {
      setLoading(false)
    }
  }

  const getLevelColor = (level) => {
    switch (level) {
      case 'Foundational': return 'bg-green-100 text-green-800'
      case 'Associate': return 'bg-blue-100 text-blue-800'
      case 'Professional': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando certificações...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          AWS Simulados
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Prepare-se para as certificações AWS com simulados fiéis às provas reais. 
          Questões atualizadas com explicações detalhadas para cada resposta.
        </p>
      </div>

      {/* Estatísticas */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
        <Card>
          <CardContent className="p-6 text-center">
            <BookOpen className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">4</div>
            <div className="text-sm text-gray-600">Certificações</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Target className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">500+</div>
            <div className="text-sm text-gray-600">Questões</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Clock className="h-8 w-8 text-orange-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">95%</div>
            <div className="text-sm text-gray-600">Taxa de Aprovação</div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6 text-center">
            <Trophy className="h-8 w-8 text-yellow-600 mx-auto mb-2" />
            <div className="text-2xl font-bold text-gray-900">1000+</div>
            <div className="text-sm text-gray-600">Aprovados</div>
          </CardContent>
        </Card>
      </div>

      {/* Lista de Certificações */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {certifications.map((cert) => (
          <Card key={cert.code} className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <Badge className={getLevelColor(cert.level)}>
                  {cert.level}
                </Badge>
                <Badge variant="outline">{cert.code}</Badge>
              </div>
              <CardTitle className="text-xl">{cert.name}</CardTitle>
              <CardDescription>
                Prepare-se para a certificação {cert.level.toLowerCase()} da AWS
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Questões:</span>
                  <span className="font-medium">{cert.questions}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Duração:</span>
                  <span className="font-medium">{cert.duration} minutos</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Pontuação mínima:</span>
                  <span className="font-medium">{cert.passing_score}</span>
                </div>
              </div>
              <Button 
                className="w-full" 
                onClick={() => window.location.href = `/certification/${cert.code}`}
              >
                Iniciar Simulado
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Footer */}
      <div className="text-center mt-16 py-8 border-t border-gray-200">
        <p className="text-gray-600">
          Sistema de simulados AWS - Questões baseadas nas provas reais
        </p>
      </div>
    </div>
  )
}

// Página de certificação com configuração do simulado
function CertificationPage() {
  const { code } = useParams()
  const navigate = useNavigate()
  const [certification, setCertification] = useState(null)
  const [loading, setLoading] = useState(true)
  const [userName, setUserName] = useState('')
  const [numQuestions, setNumQuestions] = useState(65)
  const [starting, setStarting] = useState(false)

  useEffect(() => {
    fetchCertificationInfo()
  }, [code])

  const fetchCertificationInfo = async () => {
    try {
      const response = await fetch('/api/certifications')
      const data = await response.json()
      const cert = data.find(c => c.code === code)
      setCertification(cert)
      setNumQuestions(cert?.questions || 65)
    } catch (error) {
      console.error('Erro ao carregar certificação:', error)
    } finally {
      setLoading(false)
    }
  }

  const startSimulation = async () => {
    if (!userName.trim()) {
      alert('Por favor, digite seu nome')
      return
    }

    setStarting(true)
    try {
      const response = await fetch('/api/simulation/start', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          certification: code,
          user_name: userName,
          num_questions: numQuestions
        })
      })

      if (response.ok) {
        const data = await response.json()
        navigate(`/simulation/${data.session_id}`)
      } else {
        const error = await response.json()
        alert(error.error || 'Erro ao iniciar simulado')
      }
    } catch (error) {
      console.error('Erro ao iniciar simulado:', error)
      alert('Erro ao iniciar simulado')
    } finally {
      setStarting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando certificação...</p>
        </div>
      </div>
    )
  }

  if (!certification) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Certificação não encontrada</h1>
          <Button onClick={() => navigate('/')}>Voltar ao início</Button>
        </div>
      </div>
    )
  }

  const getLevelColor = (level) => {
    switch (level) {
      case 'Foundational': return 'bg-green-100 text-green-800'
      case 'Associate': return 'bg-blue-100 text-blue-800'
      case 'Professional': return 'bg-purple-100 text-purple-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="mb-8">
        <Button 
          variant="outline" 
          onClick={() => navigate('/')}
          className="mb-4"
        >
          ← Voltar
        </Button>
        
        <div className="text-center">
          <Badge className={getLevelColor(certification.level) + ' mb-4'}>
            {certification.level}
          </Badge>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {certification.name}
          </h1>
          <p className="text-gray-600">
            Prepare-se para a certificação {certification.code}
          </p>
        </div>
      </div>

      {/* Informações do Exame */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <BookOpen className="mr-2 h-5 w-5" />
              Informações do Exame
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Código:</span>
              <span className="font-medium">{certification.code}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Questões:</span>
              <span className="font-medium">{certification.questions}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Duração:</span>
              <span className="font-medium">{certification.duration} minutos</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Pontuação mínima:</span>
              <span className="font-medium">{certification.passing_score}/1000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Nível:</span>
              <span className="font-medium">{certification.level}</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Target className="mr-2 h-5 w-5" />
              Configurar Simulado
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Seu nome
              </label>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Digite seu nome"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Número de questões
              </label>
              <select
                value={numQuestions}
                onChange={(e) => setNumQuestions(parseInt(e.target.value))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value={10}>10 questões (teste rápido)</option>
                <option value={20}>20 questões (revisão)</option>
                <option value={certification.questions}>{certification.questions} questões (simulado completo)</option>
              </select>
            </div>

            <Button 
              onClick={startSimulation}
              disabled={starting}
              className="w-full"
            >
              {starting ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Iniciando...
                </>
              ) : (
                <>
                  Iniciar Simulado
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Dicas */}
      <Card>
        <CardHeader>
          <CardTitle>Dicas para o Simulado</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Durante o simulado:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Leia cada questão cuidadosamente</li>
                <li>• Gerencie seu tempo adequadamente</li>
                <li>• Marque questões difíceis para revisão</li>
                <li>• Use o processo de eliminação</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium text-gray-900 mb-2">Após o simulado:</h4>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• Revise todas as explicações</li>
                <li>• Identifique áreas de melhoria</li>
                <li>• Anote conceitos para estudar</li>
                <li>• Refaça questões incorretas</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Página de execução do simulado
function SimulationPage() {
  const { sessionId } = useParams()
  const navigate = useNavigate()
  const [simulation, setSimulation] = useState(null)
  const [questions, setQuestions] = useState([])
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [timeLeft, setTimeLeft] = useState(0)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [flaggedQuestions, setFlaggedQuestions] = useState(new Set())

  useEffect(() => {
    fetchSimulation()
  }, [sessionId])

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000)
      return () => clearTimeout(timer)
    } else if (timeLeft === 0 && simulation) {
      // Tempo esgotado - submeter automaticamente
      submitSimulation()
    }
  }, [timeLeft, simulation])

  const fetchSimulation = async () => {
    try {
      const response = await fetch(`/api/simulation/${sessionId}`)
      if (response.ok) {
        const data = await response.json()
        setSimulation(data.simulation)
        setQuestions(data.questions)
        setTimeLeft(data.simulation.duration * 60) // converter para segundos
      } else {
        navigate('/')
      }
    } catch (error) {
      console.error('Erro ao carregar simulação:', error)
      navigate('/')
    } finally {
      setLoading(false)
    }
  }

  const handleAnswer = (questionIndex, optionIndex) => {
    const question = questions[questionIndex]
    const newAnswers = { ...answers }
    
    if (question.question_type === 'multiple_response') {
      // Múltipla resposta - toggle da opção
      if (!newAnswers[questionIndex]) {
        newAnswers[questionIndex] = []
      }
      const currentAnswers = [...newAnswers[questionIndex]]
      const index = currentAnswers.indexOf(optionIndex)
      if (index > -1) {
        currentAnswers.splice(index, 1)
      } else {
        currentAnswers.push(optionIndex)
      }
      newAnswers[questionIndex] = currentAnswers
    } else {
      // Múltipla escolha - uma única resposta
      newAnswers[questionIndex] = [optionIndex]
    }
    
    setAnswers(newAnswers)
  }

  const toggleFlag = (questionIndex) => {
    const newFlagged = new Set(flaggedQuestions)
    if (newFlagged.has(questionIndex)) {
      newFlagged.delete(questionIndex)
    } else {
      newFlagged.add(questionIndex)
    }
    setFlaggedQuestions(newFlagged)
  }

  const submitSimulation = async () => {
    setSubmitting(true)
    try {
      const response = await fetch(`/api/simulation/${sessionId}/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ answers })
      })

      if (response.ok) {
        navigate(`/results/${sessionId}`)
      } else {
        alert('Erro ao submeter simulado')
      }
    } catch (error) {
      console.error('Erro ao submeter simulado:', error)
      alert('Erro ao submeter simulado')
    } finally {
      setSubmitting(false)
    }
  }

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    const secs = seconds % 60
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
  }

  const getTimeColor = () => {
    if (timeLeft > 1800) return 'text-green-600' // > 30 min
    if (timeLeft > 600) return 'text-yellow-600'  // > 10 min
    return 'text-red-600' // < 10 min
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando simulado...</p>
        </div>
      </div>
    )
  }

  if (!simulation || questions.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Simulado não encontrado</h1>
          <Button onClick={() => navigate('/')}>Voltar ao início</Button>
        </div>
      </div>
    )
  }

  const currentQ = questions[currentQuestion]
  const currentAnswer = answers[currentQuestion] || []
  const answeredCount = Object.keys(answers).length
  const progress = ((currentQuestion + 1) / questions.length) * 100

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header fixo */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <h1 className="text-lg font-semibold">{simulation.certification}</h1>
              <Badge variant="outline">
                Questão {currentQuestion + 1} de {questions.length}
              </Badge>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4" />
                <span className={`font-mono text-lg ${getTimeColor()}`}>
                  {formatTime(timeLeft)}
                </span>
              </div>
              
              <Button
                onClick={submitSimulation}
                disabled={submitting}
                variant="outline"
              >
                {submitting ? 'Enviando...' : 'Finalizar'}
              </Button>
            </div>
          </div>
          
          {/* Barra de progresso */}
          <div className="mt-3">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-xs text-gray-500 mt-1">
              <span>{answeredCount} respondidas</span>
              <span>{flaggedQuestions.size} marcadas</span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Navegação das questões */}
          <div className="lg:col-span-1">
            <Card className="sticky top-32">
              <CardHeader>
                <CardTitle className="text-sm">Navegação</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-5 gap-2">
                  {questions.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentQuestion(index)}
                      className={`
                        w-8 h-8 text-xs rounded border-2 transition-colors
                        ${index === currentQuestion 
                          ? 'bg-blue-600 text-white border-blue-600' 
                          : answers[index] 
                            ? 'bg-green-100 text-green-800 border-green-300'
                            : 'bg-gray-100 text-gray-600 border-gray-300'
                        }
                        ${flaggedQuestions.has(index) ? 'ring-2 ring-yellow-400' : ''}
                      `}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>
                
                <div className="mt-4 text-xs space-y-2">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-blue-600 rounded"></div>
                    <span>Atual</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-green-100 border border-green-300 rounded"></div>
                    <span>Respondida</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 bg-gray-100 border border-gray-300 rounded ring-2 ring-yellow-400"></div>
                    <span>Marcada</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Questão atual */}
          <div className="lg:col-span-3">
            <Card>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg mb-2">
                      Questão {currentQuestion + 1}
                    </CardTitle>
                    <Badge variant="outline" className="mb-4">
                      {currentQ.domain}
                    </Badge>
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleFlag(currentQuestion)}
                    className={flaggedQuestions.has(currentQuestion) ? 'bg-yellow-100' : ''}
                  >
                    🚩 {flaggedQuestions.has(currentQuestion) ? 'Desmarcada' : 'Marcar'}
                  </Button>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="mb-6">
                  <p className="text-gray-900 leading-relaxed">
                    {currentQ.question_text}
                  </p>
                  
                  {currentQ.question_type === 'multiple_response' && (
                    <p className="text-sm text-blue-600 mt-2">
                      * Selecione todas as opções corretas
                    </p>
                  )}
                </div>

                <div className="space-y-3">
                  {currentQ.options.map((option, index) => (
                    <label
                      key={index}
                      className={`
                        flex items-start space-x-3 p-4 rounded-lg border-2 cursor-pointer transition-colors
                        ${currentAnswer.includes(index)
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                        }
                      `}
                    >
                      <input
                        type={currentQ.question_type === 'multiple_response' ? 'checkbox' : 'radio'}
                        name={`question-${currentQuestion}`}
                        checked={currentAnswer.includes(index)}
                        onChange={() => handleAnswer(currentQuestion, index)}
                        className="mt-1"
                      />
                      <span className="text-gray-900">{option}</span>
                    </label>
                  ))}
                </div>

                {/* Navegação */}
                <div className="flex justify-between mt-8">
                  <Button
                    variant="outline"
                    onClick={() => setCurrentQuestion(Math.max(0, currentQuestion - 1))}
                    disabled={currentQuestion === 0}
                  >
                    ← Anterior
                  </Button>
                  
                  {currentQuestion === questions.length - 1 ? (
                    <Button
                      onClick={submitSimulation}
                      disabled={submitting}
                      className="bg-green-600 hover:bg-green-700"
                    >
                      {submitting ? 'Enviando...' : 'Finalizar Simulado'}
                    </Button>
                  ) : (
                    <Button
                      onClick={() => setCurrentQuestion(Math.min(questions.length - 1, currentQuestion + 1))}
                    >
                      Próxima →
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

// Página de resultados do simulado
function ResultsPage() {
  const { sessionId } = useParams()
  const navigate = useNavigate()
  const [results, setResults] = useState(null)
  const [loading, setLoading] = useState(true)
  const [showExplanations, setShowExplanations] = useState(false)

  useEffect(() => {
    fetchResults()
  }, [sessionId])

  const fetchResults = async () => {
    try {
      const response = await fetch(`/api/simulation/${sessionId}/results`)
      if (response.ok) {
        const data = await response.json()
        setResults(data)
      } else {
        navigate('/')
      }
    } catch (error) {
      console.error('Erro ao carregar resultados:', error)
      navigate('/')
    } finally {
      setLoading(false)
    }
  }

  const getScoreColor = (score) => {
    if (score >= 700) return 'text-green-600'
    if (score >= 600) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBgColor = (score) => {
    if (score >= 700) return 'bg-green-100'
    if (score >= 600) return 'bg-yellow-100'
    return 'bg-red-100'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando resultados...</p>
        </div>
      </div>
    )
  }

  if (!results) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Resultados não encontrados</h1>
          <Button onClick={() => navigate('/')}>Voltar ao início</Button>
        </div>
      </div>
    )
  }

  const { simulation, score, percentage, correct_count, total_questions, questions_with_answers } = results
  const passed = score >= simulation.passing_score

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Resultados do Simulado
        </h1>
        <p className="text-gray-600">
          {simulation.certification} - {simulation.user_name}
        </p>
      </div>

      {/* Resultado Principal */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className={getScoreBgColor(score)}>
          <CardContent className="p-6 text-center">
            <Trophy className={`h-12 w-12 mx-auto mb-4 ${getScoreColor(score)}`} />
            <div className={`text-4xl font-bold ${getScoreColor(score)} mb-2`}>
              {score}
            </div>
            <div className="text-sm text-gray-600">
              Pontuação (mín: {simulation.passing_score})
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <Target className="h-12 w-12 text-blue-600 mx-auto mb-4" />
            <div className="text-4xl font-bold text-blue-600 mb-2">
              {percentage.toFixed(1)}%
            </div>
            <div className="text-sm text-gray-600">
              Percentual de acerto
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6 text-center">
            <BookOpen className="h-12 w-12 text-purple-600 mx-auto mb-4" />
            <div className="text-4xl font-bold text-purple-600 mb-2">
              {correct_count}/{total_questions}
            </div>
            <div className="text-sm text-gray-600">
              Questões corretas
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Status */}
      <Card className={`mb-8 ${passed ? 'border-green-500' : 'border-red-500'}`}>
        <CardContent className="p-6 text-center">
          <div className={`text-2xl font-bold mb-2 ${passed ? 'text-green-600' : 'text-red-600'}`}>
            {passed ? '🎉 Parabéns! Você passou!' : '😔 Não foi desta vez'}
          </div>
          <p className="text-gray-600">
            {passed 
              ? `Você atingiu a pontuação mínima de ${simulation.passing_score} pontos.`
              : `Você precisava de ${simulation.passing_score} pontos, mas obteve ${score}.`
            }
          </p>
        </CardContent>
      </Card>

      {/* Performance por Domínio */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Performance por Domínio</CardTitle>
        </CardHeader>
        <CardContent>
          {Object.entries(
            questions_with_answers.reduce((acc, q) => {
              if (!acc[q.domain]) {
                acc[q.domain] = { correct: 0, total: 0 }
              }
              acc[q.domain].total++
              if (q.is_correct) {
                acc[q.domain].correct++
              }
              return acc
            }, {})
          ).map(([domain, stats]) => {
            const domainPercentage = (stats.correct / stats.total) * 100
            return (
              <div key={domain} className="mb-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">{domain}</span>
                  <span className="text-sm text-gray-600">
                    {stats.correct}/{stats.total} ({domainPercentage.toFixed(1)}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${domainPercentage >= 70 ? 'bg-green-500' : domainPercentage >= 50 ? 'bg-yellow-500' : 'bg-red-500'}`}
                    style={{ width: `${domainPercentage}%` }}
                  ></div>
                </div>
              </div>
            )
          })}
        </CardContent>
      </Card>

      {/* Ações */}
      <div className="flex justify-center space-x-4 mb-8">
        <Button
          onClick={() => setShowExplanations(!showExplanations)}
          variant="outline"
        >
          {showExplanations ? 'Ocultar' : 'Ver'} Explicações
        </Button>
        
        <Button
          onClick={() => navigate(`/certification/${simulation.certification}`)}
        >
          Fazer Novo Simulado
        </Button>
        
        <Button
          onClick={() => navigate('/')}
          variant="outline"
        >
          Voltar ao Início
        </Button>
      </div>

      {/* Explicações Detalhadas */}
      {showExplanations && (
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Revisão Detalhada
          </h2>
          
          {questions_with_answers.map((q, index) => (
            <Card key={index} className={`${q.is_correct ? 'border-green-200' : 'border-red-200'}`}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-lg">
                      Questão {index + 1}
                    </CardTitle>
                    <Badge variant="outline" className="mt-2">
                      {q.domain}
                    </Badge>
                  </div>
                  <Badge className={q.is_correct ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                    {q.is_correct ? '✓ Correta' : '✗ Incorreta'}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent>
                <div className="mb-4">
                  <p className="text-gray-900 font-medium mb-4">
                    {q.question_text}
                  </p>
                  
                  <div className="space-y-2">
                    {q.options.map((option, optIndex) => {
                      const isCorrect = q.correct_answers.includes(optIndex)
                      const wasSelected = q.user_answers.includes(optIndex)
                      
                      return (
                        <div
                          key={optIndex}
                          className={`
                            p-3 rounded border-2
                            ${isCorrect 
                              ? 'border-green-500 bg-green-50' 
                              : wasSelected 
                                ? 'border-red-500 bg-red-50'
                                : 'border-gray-200'
                            }
                          `}
                        >
                          <div className="flex items-center space-x-2">
                            {isCorrect && <span className="text-green-600">✓</span>}
                            {wasSelected && !isCorrect && <span className="text-red-600">✗</span>}
                            <span>{option}</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
                
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">Explicação:</h4>
                  <p className="text-blue-800">{q.explanation}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default App

