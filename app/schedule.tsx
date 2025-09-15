import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useCall } from '../context/CallContext';

export default function Schedule() {
  const { scheduleCall } = useCall();
  const [minutes, setMinutes] = useState('5');
  const [confirmation, setConfirmation] = useState('');

  const handleSchedule = () => {
    const m = parseInt(minutes, 10);
    if (isNaN(m) || m < 1 || m > 60) {
      setConfirmation('Enter 1-60 minutes');
      return;
    }
    scheduleCall(m);
    setConfirmation(`Call scheduled in ${m} minutes`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Minutes until call (1-60):</Text>
      <TextInput
        style={styles.input}
        keyboardType="number-pad"
        value={minutes}
        onChangeText={setMinutes}
      />
      <TouchableOpacity style={styles.button} onPress={handleSchedule}>
        <Text style={styles.buttonText}>Schedule</Text>
      </TouchableOpacity>
      {confirmation ? <Text style={styles.confirm}>{confirmation}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  label: { fontSize: 18, marginBottom: 10 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#d9534f',
    padding: 15,
    borderRadius: 6,
    alignItems: 'center',
  },
  buttonText: { color: 'white', fontSize: 18, fontWeight: 'bold' },
  confirm: { marginTop: 20, fontSize: 16 },
});

