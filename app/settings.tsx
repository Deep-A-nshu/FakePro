import React, { useState } from 'react';
import { Text, StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { useCall } from '../context/CallContext';

export default function Settings() {
  const { settings, updateSettings } = useCall();
  const [name, setName] = useState(settings.name);
  const [number, setNumber] = useState(settings.number);
  const [photo, setPhoto] = useState(settings.photo || '');
  const [message, setMessage] = useState(settings.message);
  const [voice, setVoice] = useState(settings.voice || '');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    updateSettings({ name, number, photo: photo || undefined, message, voice });
    setSaved(true);
    setTimeout(() => setSaved(false), 1500);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.label}>Caller Name</Text>
      <TextInput style={styles.input} value={name} onChangeText={setName} />
      <Text style={styles.label}>Phone Number</Text>
      <TextInput style={styles.input} value={number} onChangeText={setNumber} keyboardType="phone-pad" />
      <Text style={styles.label}>Photo URL</Text>
      <TextInput style={styles.input} value={photo} onChangeText={setPhoto} />
      <Text style={styles.label}>Message</Text>
      <TextInput style={[styles.input, styles.multiline]} value={message} onChangeText={setMessage} multiline />
      <Text style={styles.label}>Voice (placeholder)</Text>
      <TextInput style={styles.input} value={voice} onChangeText={setVoice} />
      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
      {saved ? <Text style={styles.saved}>Saved</Text> : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  label: { fontSize: 16, marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 15,
  },
  multiline: { height: 80, textAlignVertical: 'top' },
  button: { backgroundColor: '#d9534f', padding: 15, borderRadius: 6, alignItems: 'center' },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  saved: { marginTop: 10, textAlign: 'center', fontSize: 16 },
});

