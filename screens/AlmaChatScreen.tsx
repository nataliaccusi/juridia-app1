import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React, { useRef, useState } from 'react'
import {
    ActivityIndicator,
    Image,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native'
import type { RootStackParamList } from '../navigation/AppNavigator'

// Cada mensaje puede venir de "alma" o "usuario"
type ChatMessage = {
  sender: 'alma' | 'usuario'
  text: string
}

type ChatNavProp = NativeStackNavigationProp<RootStackParamList, 'Chat'>

// Las preguntas que hará Alma
const questions = [
  {
    key: 'tipo',
    text:
      '¿Qué tipo de situación estás atravesando?\n\n' +
      '1. Divorcio\n' +
      '2. Violencia familiar\n' +
      '3. Tenencia de hijos\n' +
      '4. Pensión de alimentos\n' +
      '5. Otro'
  },
  { key: 'conviven', text: '¿Tu pareja y tú conviven actualmente? (Sí/No)' },
  { key: 'maltrato', text: '¿La relación ha sido conflictiva o ha habido maltrato? (Sí/No)' },
  { key: 'continuar', text: '¿Deseas continuar con las recomendaciones? (Sí/No)' }
]

// Para reconocer palabras clave en la primera opción
const keywordMap: Record<string, number> = {
  divorcio: 0,
  violencia: 1,
  familiar: 1,
  tenencia: 2,
  pensión: 3,
  alimentos: 3,
  otro: 4
}

export default function AlmaChatScreen() {
  const navigation = useNavigation<ChatNavProp>()
  const scrollViewRef = useRef<ScrollView>(null)

  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'alma',
      text:
        'Hola, soy Alma 💗, tu guía legal personal. Estoy aquí para ayudarte a entender tu situación y prepararte antes de contactar a un abogado. ¿Te parece bien si empezamos? (Sí/No)'
    }
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string>>({})

  // Simula la respuesta del modelo
  async function getBotResponse(_prompt: string): Promise<string> {
    // Aquí podrías variar según _prompt, pero devolvemos siempre lo mismo
    return Promise.resolve(
      '–– Caso de ejemplo ––\n\nResumen breve de tu situación y primeras recomendaciones legales…'
    )
  }

  const sendMessage = async () => {
    const text = input.trim()
    if (!text) return

    // 1) agregamos mensaje de usuario
    const newMsgs: ChatMessage[] = [...messages, { sender: 'usuario', text }]
    // 2) placeholder de Alma
    setMessages([...newMsgs, { sender: 'alma', text: '...' }])
    setInput('')
    setLoading(true)

    try {
      // Paso 0: consentimiento
      if (currentStep === 0) {
        if (['sí', 'si'].includes(text.toLowerCase())) {
          setMessages([...newMsgs, { sender: 'alma', text: questions[0].text }])
          setCurrentStep(1)
        } else {
          setMessages([...newMsgs, { sender: 'alma', text: 'De acuerdo. Avísame cuando quieras empezar.' }])
        }
        setLoading(false)
        return
      }

      // Paso final: generar Case Brief cuando currentStep === preguntas.length
      if (currentStep === questions.length) {
        // incluimos también la respuesta a "continuar"
        const finalAnswers = {
          ...answers,
          [questions[questions.length - 1].key]: text
        }
        // simulamos llamada
        const brief = await getBotResponse(JSON.stringify(finalAnswers))
        setMessages([
          ...newMsgs,
          { sender: 'alma', text: 'Estoy generando tu Case Brief. Un momento…' },
          { sender: 'alma', text: brief }
        ])

        // navegamos a Recommendations sin params
        setTimeout(() => navigation.navigate('Recommendations'), 1000)
        setLoading(false)
        return
      }

      // Paso 1: menú de tipos
      if (currentStep === 1) {
        const opts = [
          'Divorcio',
          'Violencia familiar',
          'Tenencia de hijos',
          'Pensión de alimentos',
          'Otro'
        ]
        let idx = parseInt(text, 10) - 1
        if (isNaN(idx)) {
          const found = Object.keys(keywordMap).find((k) =>
            text.toLowerCase().includes(k)
          )
          if (found !== undefined) idx = keywordMap[found]
        }
        if (idx >= 0 && idx < opts.length) {
          const a = { ...answers, [questions[0].key]: opts[idx] }
          setAnswers(a)
          setMessages([
            ...newMsgs,
            {
              sender: 'alma',
              text: `Gracias por confiarme esta información. Sé que un proceso de ${opts[idx].toLowerCase()} puede ser muy duro, pero estás dando un paso valiente al buscar apoyo legal.`
            },
            { sender: 'alma', text: questions[1].text }
          ])
          setCurrentStep(2)
        } else {
          setMessages([
            ...newMsgs,
            {
              sender: 'alma',
              text: 'Por favor, elige una opción válida (1–5) o escribe palabra relacionada.'
            }
          ])
        }
        setLoading(false)
        return
      }

      // Pasos 2 y 3: preguntas Sí/No
      {
        const key = questions[currentStep - 1].key
        const a = { ...answers, [key]: text }
        setAnswers(a)

        const nextQ = questions[currentStep]
        if (key === 'maltrato' && ['sí', 'si'].includes(text.toLowerCase())) {
          setMessages([
            ...newMsgs,
            {
              sender: 'alma',
              text:
                'Lamento que estés pasando por esto. Estoy aquí para ayudarte con respeto y sin juzgar.'
            },
            { sender: 'alma', text: nextQ.text }
          ])
        } else {
          setMessages([...newMsgs, { sender: 'alma', text: nextQ.text }])
        }
        setCurrentStep(currentStep + 1)
      }
    } catch {
      setMessages([
        ...messages,
        {
          sender: 'alma',
          text: 'Ups, hubo un error simulando tu caso. ¿Intentamos de nuevo?'
        }
      ])
    } finally {
      setLoading(false)
    }
  }

  // Render de cada bubble
  const renderMessages = messages.map((msg, i) => {
    const isAlma = msg.sender === 'alma'
    return (
      <View
        key={i}
        style={[styles.row, isAlma ? styles.almaRow : styles.userRow]}
      >
        {isAlma && (
          <Image
            source={require('../assets/images/juridia-logo.png')}
            style={styles.avatar}
          />
        )}
        <View style={[styles.bubble, isAlma ? styles.almaBubble : styles.userBubble]}>
          {isAlma && <Text style={styles.almaLabel}>Alma 💗</Text>}
          <Text style={[styles.msgText, isAlma ? styles.almaText : styles.userText]}>
            {msg.text}
          </Text>
        </View>
      </View>
    )
  })

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
        <Text style={styles.backText}>← Volver</Text>
      </TouchableOpacity>

      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.chatBox}
        showsVerticalScrollIndicator={false}
        onContentSizeChange={() =>
          scrollViewRef.current?.scrollToEnd({ animated: true })
        }
      >
        {renderMessages}
        {loading && <ActivityIndicator color="#8B5CF6" style={{ margin: 8 }} />}
      </ScrollView>

      <View style={styles.inputWrap}>
        <TextInput
          style={styles.input}
          placeholder="Escribe tu mensaje…"
          placeholderTextColor="#9CA3AF"
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.sendBtn} onPress={sendMessage} disabled={loading}>
          <Text style={styles.sendText}>Enviar</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  back: { padding: 12 },
  backText: { color: '#8B5CF6', fontWeight: '500' },
  chatBox: { padding: 16 },

  row: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 12 },
  almaRow: { justifyContent: 'flex-start' },
  userRow: { justifyContent: 'flex-end' },

  bubble: { maxWidth: '85%', borderRadius: 16, padding: 12 },
  almaBubble: { backgroundColor: '#F3E8FF' },
  userBubble: { backgroundColor: '#E0E7FF' },

  almaLabel: { fontSize: 14, fontWeight: '600', color: '#5B21B6', marginBottom: 4 },
  msgText: { fontSize: 15, lineHeight: 22 },
  almaText: { color: '#5B21B6' },
  userText: { color: '#1E293B' },

  avatar: { width: 24, height: 24, borderRadius: 12, marginRight: 8 },

  inputWrap: {
    flexDirection: 'row',
    padding: 12,
    borderTopWidth: 1,
    borderColor: '#E5E7EB',
    alignItems: 'center'
  },
  input: {
    flex: 1,
    backgroundColor: '#F9FAFB',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10,
    fontSize: 16,
    marginRight: 8
  },
  sendBtn: {
    backgroundColor: '#8B5CF6',
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 10
  },
  sendText: { color: '#FFF', fontWeight: '600' }
})
