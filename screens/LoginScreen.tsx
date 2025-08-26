import { FontAwesome } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { LinearGradient } from 'expo-linear-gradient'
import React, { useState } from 'react'
import {
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native'
import type { RootStackParamList } from '../navigation/AppNavigator'

type LoginNavProp = NativeStackNavigationProp<RootStackParamList, 'Login'>

export default function LoginScreen() {
  const navigation = useNavigation<LoginNavProp>()
  const [email, setEmail] = useState('')

  const handleContinue = () => {
    navigation.replace('Chat')
  }

  return (
    <LinearGradient colors={['#FF6EA1', '#8B4EDD']} style={styles.gradient}>
      <SafeAreaView style={styles.container}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.appTitle}>Juridía</Text>
          <Text style={styles.headline}>Crea una cuenta</Text>
          <Text style={styles.subtitle}>
            Enter your email to sign up for this app.
          </Text>
        </View>

        {/* Form */}
        <View style={styles.formContainer}>
          <TextInput
            style={styles.inputField}
            placeholder="email@domain.com"
            placeholderTextColor="#CCC"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />

          <TouchableOpacity
            style={[styles.primaryButton, !email.trim() && styles.disabledButton]}
            onPress={handleContinue}
            disabled={!email.trim()}
          >
            <Text style={styles.primaryText}>Continuar</Text>
          </TouchableOpacity>
        </View>

        {/* Social Buttons */}
        <View style={styles.socialContainer}>
          <View style={styles.orContainer}>
            <View style={styles.line} />
            <Text style={styles.orText}>o</Text>
            <View style={styles.line} />
          </View>

          <TouchableOpacity style={styles.socialButton}>
            <FontAwesome name="google" size={20} color="#EA4335" />
            <Text style={styles.socialText}>Continuar con Google</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.socialButton}>
            <FontAwesome name="apple" size={20} color="#000" />
            <Text style={styles.socialText}>Continuar con Apple</Text>
          </TouchableOpacity>
        </View>

        {/* Footer */}
        <Text style={styles.footerText}>
          By clicking continue, you agree to our{' '}
          <Text style={styles.link}>Terms of Service</Text> and{' '}
          <Text style={styles.link}>Privacy Policy</Text>.
        </Text>
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
    justifyContent: 'space-evenly',
    alignItems: 'center',
    paddingHorizontal: 24
  },
  header: {
    alignItems: 'center'
  },
  appTitle: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFF'
  },
  headline: {
    fontSize: 24,
    fontWeight: '600',
    color: '#FFF',
    marginTop: 8
  },
  subtitle: {
    fontSize: 16,
    color: '#F0EAEF',
    textAlign: 'center',
    marginTop: 4
  },

  formContainer: {
    width: '85%',
    maxWidth: 360,
    alignItems: 'center'
  },
  inputField: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    color: '#000'
  },
  primaryButton: {
    marginTop: 12,
    width: '100%',
    backgroundColor: '#4F46E5',
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center'
  },
  disabledButton: {
    opacity: 0.5
  },
  primaryText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600'
  },

  socialContainer: {
    width: '100%',
    alignItems: 'center'
  },
  orContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '85%',
    maxWidth: 360,
    marginBottom: 12
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255,255,255,0.5)'
  },
  orText: {
    marginHorizontal: 8,
    color: '#FFF',
    fontWeight: '500'
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '85%',
    maxWidth: 360,
    backgroundColor: '#FFF',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12
  },
  socialText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    color: '#000',
    marginLeft: 8
  },

  footerText: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
    textAlign: 'center',
    paddingHorizontal: 24
  },
  link: {
    textDecorationLine: 'underline',
    color: '#E0E7FF'
  }
})
