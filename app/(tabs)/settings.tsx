import React, { useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { AppContext } from '../context/AppContext';

export default function SettingsScreen() {
  const { callSettings, setCallSettings, darkMode, setDarkMode } = useContext(AppContext);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Customize Call</Text>

      <TextInput
        value={callSettings.callerName}
        onChangeText={(v)=>setCallSettings({...callSettings,callerName:v})}
        style={styles.input}
        placeholder="Caller Name"
        placeholderTextColor="#666"
      />
      <TextInput
        value={callSettings.callerNumber}
        onChangeText={(v)=>setCallSettings({...callSettings,callerNumber:v})}
        style={styles.input}
        placeholder="Phone Number"
        placeholderTextColor="#666"
      />
      <TextInput
        value={callSettings.callerAvatar}
        onChangeText={(v)=>setCallSettings({...callSettings,callerAvatar:v.substring(0,2).toUpperCase()})}
        style={styles.input}
        placeholder="Avatar"
        placeholderTextColor="#666"
        maxLength={2}
      />
      <TextInput
        value={callSettings.message}
        onChangeText={(v)=>setCallSettings({...callSettings,message:v})}
        style={[styles.input,{height:100}]}
        multiline
        placeholder="Voice Message"
        placeholderTextColor="#666"
      />

      <View style={styles.switchRow}>
        <Text style={styles.label}>Vibration</Text>
        <Switch
          value={callSettings.vibration}
          onValueChange={() => setCallSettings({...callSettings,vibration:!callSettings.vibration})}
        />
      </View>

      <View style={styles.switchRow}>
        <Text style={styles.label}>Dark Mode</Text>
        <Switch
          value={darkMode}
          onValueChange={() => setDarkMode(!darkMode)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,backgroundColor:'#111',padding:20},
  heading:{color:'#fff',fontSize:24,fontWeight:'bold',marginBottom:20},
  input:{backgroundColor:'#222',color:'#fff',padding:15,borderRadius:10,fontSize:16,marginBottom:15},
  switchRow:{flexDirection:'row',justifyContent:'space-between',alignItems:'center',marginVertical:10},
  label:{color:'#fff',fontSize:16}
});
