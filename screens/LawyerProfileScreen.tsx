import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import type { RootStackParamList } from '../navigation/AppNavigator';

type NavProp = NativeStackNavigationProp<RootStackParamList, 'LawyerProfile'>;
// Este es el tipo correcto para la ruta:
// — ParamList —
// — El nombre de la pantalla —
type ProfileRouteProp = RouteProp<RootStackParamList, 'LawyerProfile'>;

export default function LawyerProfileScreen() {
  const navigation = useNavigation<NavProp>();
  // aquí sí le pasamos el RouteProp genérico que
  // nos da React Navigation
  const route = useRoute<ProfileRouteProp>();
  const { lawyer } = route.params;

  const [modalVisible, setModalVisible] = useState(false);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
        <Text style={styles.backText}>← Volver</Text>
      </TouchableOpacity>

      <Text style={styles.name}>{lawyer.name}</Text>

      <View style={styles.tabs}>
        <Text style={styles.activeTab}>Presentación</Text>
        <Text style={styles.tab}>Formación</Text>
        <Text style={styles.tab}>Trayectoria</Text>
      </View>

      <Text style={styles.role}>
        Abogada especializada en Derecho de Familia y Género
      </Text>

      <Text style={styles.experience}>
        +10 años de experiencia 👩‍⚖️ Casos de tenencia, divorcio y violencia familiar
      </Text>

      <Text style={styles.bio}>
        “Hola, soy {lawyer.name.split(' ')[0]}. Mi enfoque legal está centrado en el respeto, la empatía y la claridad. Acompaño principalmente a mujeres en procesos complejos como divorcios con hijos o situaciones de violencia. Mi prioridad es que te sientas escuchada, segura y con el control de tu caso desde el primer día. Si necesitas una guía cercana y profesional, aquí estoy para ayudarte.”
      </Text>

      <Text style={styles.location}>
        📍 Modalidad: Virtual y presencial (Miraflores, Lima)
      </Text>

      <Text style={styles.price}>
        Tarifa aproximada de tu caso:{' '}
        <Text style={styles.bold}>{lawyer.totalCost}</Text>
      </Text>

      <TouchableOpacity style={styles.ctaBtn} onPress={() => setModalVisible(true)}>
        <Text style={styles.ctaText}>Contactar ahora</Text>
      </TouchableOpacity>

      {/** Modal de contacto **/}
      {modalVisible && (
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>¿Cómo deseas contactarla?</Text>
            <TouchableOpacity style={styles.modalOption} onPress={() => alert('Llamada')}>
              <Text style={styles.modalOptionText}>📞 Llamada desde Juridia</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOption} onPress={() => alert('Videollamada')}>
              <Text style={styles.modalOptionText}>📹 Videollamada</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalOption} onPress={() => alert('WhatsApp')}>
              <Text style={styles.modalOptionText}>💬 WhatsApp</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalClose} onPress={() => setModalVisible(false)}>
              <Text style={{ color: '#EF4444' }}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16, backgroundColor: '#FFF', flexGrow: 1 },
  backBtn: { marginBottom: 12 },
  backText: { color: '#8B5CF6', fontWeight: '500' },
  name: { fontSize: 20, fontWeight: 'bold', color: '#1F2937', marginBottom: 8 },
  tabs: { flexDirection: 'row', gap: 8, marginBottom: 12 },
  activeTab: {
    backgroundColor: '#FCE7F3',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
    color: '#BE185D',
    fontWeight: '600'
  },
  tab: {
    backgroundColor: '#F3F4F6',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 20,
    color: '#6B7280'
  },
  role: { fontSize: 14, fontWeight: '600', color: '#111827', marginBottom: 4 },
  experience: { fontSize: 14, color: '#374151', marginBottom: 12 },
  bio: { fontSize: 14, fontStyle: 'italic', color: '#4B5563', marginBottom: 12 },
  location: { fontSize: 14, color: '#6B7280', marginBottom: 4 },
  price: { fontSize: 14, color: '#6B7280', marginBottom: 16 },
  bold: { fontWeight: 'bold', color: '#10B981' },
  ctaBtn: { backgroundColor: '#EC4899', paddingVertical: 12, borderRadius: 10, alignItems: 'center' },
  ctaText: { color: '#FFF', fontWeight: '600' },

  modalOverlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.3)'
  },
  modalContainer: {
    backgroundColor: '#FFF',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20
  },
  modalTitle: { fontSize: 18, fontWeight: '600', marginBottom: 12 },
  modalOption: { paddingVertical: 14 },
  modalOptionText: { fontSize: 16 },
  modalClose: { alignItems: 'center', marginTop: 10 }
});
