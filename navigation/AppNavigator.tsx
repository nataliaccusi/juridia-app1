// navigation/AppNavigator.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React from 'react'

import AlmaChatScreen from '../screens/AlmaChatScreen'
import LawyerProfileScreen from '../screens/LawyerProfileScreen'
import LawyerRecommendationsScreen, { Lawyer } from '../screens/LawyerRecommendationsScreen'
import LoginScreen from '../screens/LoginScreen'
import WelcomeScreen from '../screens/WelcomeScreen'

export type RootStackParamList = {
  Welcome: undefined
  Login: undefined
  Chat: undefined
  Recommendations: undefined
  LawyerProfile: { lawyer: Lawyer }
}

const Stack = createNativeStackNavigator<RootStackParamList>()

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Welcome" component={WelcomeScreen} />
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Chat" component={AlmaChatScreen} />
      <Stack.Screen name="Recommendations" component={LawyerRecommendationsScreen} />
      <Stack.Screen name="LawyerProfile" component={LawyerProfileScreen} />
    </Stack.Navigator>
  )
}
