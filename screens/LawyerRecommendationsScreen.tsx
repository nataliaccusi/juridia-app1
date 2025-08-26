// screens/LawyerRecommendationsScreen.tsx
import { useNavigation } from '@react-navigation/native'
import type { NativeStackNavigationProp } from '@react-navigation/native-stack'
import React from 'react'
import {
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import type { RootStackParamList } from '../navigation/AppNavigator'

// ► Exporta el tipo para que AppNavigator pueda importarlo
export type Lawyer = {
  name: string
  rating: number
  reviews: number
  distance: string
  university: string
  regCode: string
  totalCost: string 
}

const lawyers: Lawyer[] = [
  {
    name: 'Camila Bedoya Fernández',
    rating: 4.7,
    reviews: 260,
    distance: '1.5 km',
    university: 'USMP',
    regCode: '00271',
    totalCost: 'S/ 1,200'
  },
  {
    name: 'Graciela Cancino Barrientos',
    rating: 4.8,
    reviews: 155,
    distance: '3.7 km',
    university: 'UNFV',
    regCode: '01306',
    totalCost: 'S/ 1,000'
  },
  {
    name: 'Victoria Quispe Carrión',
    rating: 4.5,
    reviews: 142,
    distance: '4.2 km',
    university: 'UNMSM',
    regCode: '05901',
    totalCost: 'S/ 950'
  }
]

type NavProp = NativeStackNavigationProp<RootStackParamList, 'Recommendations'>

export default function LawyerRecommendationsScreen() {
  const navigation = useNavigation<NavProp>()

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {lawyers.map((lawyer, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.name}>{lawyer.name}</Text>
          <Text style={styles.detail}>
            ⭐ {lawyer.rating} ({lawyer.reviews} reseñas)
          </Text>
          <Text style={styles.detail}>🎓 {lawyer.university}</Text>
          <Text style={styles.detail}>🔖 Código CAL: {lawyer.regCode}</Text>
          <Text style={styles.detail}>📍 {lawyer.distance}</Text>
          <Text style={styles.cost}>💰 Costo total estimado: {lawyer.totalCost}</Text>

          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate('LawyerProfile', { lawyer })}
          >
            <Text style={styles.buttonText}>Seleccionar</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: '#FFF'
  },
  card: {
    backgroundColor: '#F9FAFB',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#E5E7EB'
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 4
  },
  detail: {
    fontSize: 14,
    color: '#374151',
    marginBottom: 2
  },
  cost: {
    fontSize: 14,
    fontWeight: '600',
    color: '#10B981',
    marginVertical: 8
  },
  button: {
    backgroundColor: '#8B5CF6',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignSelf: 'flex-start'
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '600'
  }
})
