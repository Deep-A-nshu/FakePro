import React from 'react';
import { Modal, View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useCall } from '../context/CallContext';

const CallScreen: React.FC = () => {
  const { settings, incoming, endCall } = useCall();

  const handleAnswer = () => {
    // Placeholder for TTS; Alert for now
    alert(settings.message);
    endCall();
  };

  return (
    <Modal visible={incoming} animationType="slide" transparent>
      <View style={styles.container}>
        {settings.photo ? (
          <Image source={{ uri: settings.photo }} style={styles.photo} />
        ) : null}
        <Text style={styles.name}>{settings.name}</Text>
        <Text style={styles.number}>{settings.number}</Text>
        <View style={styles.buttons}>
          <TouchableOpacity style={[styles.button, styles.decline]} onPress={endCall}>
            <Text style={styles.buttonText}>Decline</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.answer]} onPress={handleAnswer}>
            <Text style={styles.buttonText}>Answer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  photo: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    color: 'white',
    marginBottom: 4,
  },
  number: {
    fontSize: 16,
    color: 'white',
    marginBottom: 40,
  },
  buttons: {
    flexDirection: 'row',
    width: '60%',
    justifyContent: 'space-between',
  },
  button: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 50,
    width: 100,
  },
  decline: {
    backgroundColor: '#d9534f',
  },
  answer: {
    backgroundColor: '#5cb85c',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default CallScreen;

