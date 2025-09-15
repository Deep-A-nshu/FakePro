import React from 'react';
import { Stack } from 'expo-router';
import { CallProvider } from '../context/CallContext';
import IncomingCall from '../components/CallScreen';

export default function RootLayout() {
  return (
    <CallProvider>
      <IncomingCall />
      <Stack>
        <Stack.Screen name="index" options={{ title: 'FakeCall Pro' }} />
        <Stack.Screen name="schedule" options={{ title: 'Schedule Call' }} />
        <Stack.Screen name="settings" options={{ title: 'Settings' }} />
      </Stack>
    </CallProvider>
  );
}
