import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useCall } from '../context/CallContext';

const templates = [
  { name: 'Boss Emergency', settings: { name: 'Boss', number: '555-0101', message: 'We need you back at the office.' } },
  { name: 'Doctor Appointment', settings: { name: 'Dr. Smith', number: '555-0112', message: 'Your appointment is in 10 minutes.' } },
  { name: 'Family Call', settings: { name: 'Mom', number: '555-0188', message: 'Can you call me back?' } },
  { name: 'Delivery', settings: { name: 'Courier', number: '555-0199', message: 'Your package is at the door.' } },
];

export default function Home() {
  const router = useRouter();
  const { triggerCallNow, updateSettings } = useCall();

  return (
    <View style={styles.container}>
      <ScrollView>
        <TouchableOpacity style={styles.callButton} onPress={triggerCallNow}>
          <Text style={styles.callButtonText}>Call Now</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={() => router.push('/schedule')}>
          <Text style={styles.secondaryText}>Schedule Call</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.secondaryButton} onPress={() => router.push('/settings')}>
          <Text style={styles.secondaryText}>Settings</Text>
        </TouchableOpacity>
        <Text style={styles.sectionTitle}>Quick Templates</Text>
        {templates.map(t => (
          <TouchableOpacity
            key={t.name}
            style={styles.templateButton}
            onPress={() => updateSettings(t.settings)}
          >
            <Text style={styles.templateText}>{t.name}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  callButton: {
    backgroundColor: '#d9534f',
    paddingVertical: 40,
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 20,
  },
  callButtonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 6,
    marginBottom: 10,
  },
  secondaryText: {
    fontSize: 18,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    marginTop: 30,
    marginBottom: 10,
    fontWeight: 'bold',
  },
  templateButton: {
    padding: 15,
    backgroundColor: '#e9e9e9',
    borderRadius: 6,
    marginBottom: 10,
  },
  templateText: {
    fontSize: 16,
  },
});

