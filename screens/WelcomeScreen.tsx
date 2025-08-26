import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { LinearGradient } from 'expo-linear-gradient'
import React from 'react'
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity
} from 'react-native'
import type { RootStackParamList } from '../navigation/AppNavigator'

type WelcomeNavProp = NativeStackNavigationProp<RootStackParamList, 'Welcome'>

export default function WelcomeScreen() {
  const navigation = useNavigation<WelcomeNavProp>()

  return (
    <LinearGradient
      colors={['#FFF0F5', '#ffffff']}
      style={styles.gradient}
    >
      <SafeAreaView style={styles.container}>
        {/* Logo de Jurídia */}
        <Image
          source={require('../assets/images/juridia-logo.png')} 
          style={styles.logo}
          resizeMode="contain"
        />

        {/* Textos */}
        <Text style={styles.title}>Bienvenida a Jurídia</Text>
        <Text style={styles.subtitle}>
          Tu aliada legal personalizada con inteligencia artificial.
        </Text>

        {/* Botón de comenzar */}
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.replace('Login')}
        >
          <Text style={styles.buttonText}>Empezar</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  gradient: {
    flex: 1
  },
  container: {
    flex: 1,
    paddingHorizontal: 24,
    justifyContent: 'center',
    alignItems: 'center'
  },
  logo: {
    width: 180,
    height: 180,
    marginBottom: 24
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#4F46E5',
    textAlign: 'center',
    marginBottom: 12
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
    marginBottom: 32,
    paddingHorizontal: 16
  },
  button: {
    backgroundColor: '#FF6EA1',
    paddingVertical: 16,
    paddingHorizontal: 48,
    borderRadius: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600'
  }
})