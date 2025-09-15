import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { AppContext } from '../app/context/AppContext';

export default function CallScreen() {
  const { callSettings, setIsCallActive } = useContext(AppContext);

  return (
    <View style={styles.container}>
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>{callSettings.callerAvatar}</Text>
      </View>
      <Text style={styles.name}>{callSettings.callerName}</Text>
      <Text style={styles.number}>{callSettings.callerNumber}</Text>
      <Text style={styles.incoming}>Incoming call...</Text>
      <View style={styles.buttons}>
        <TouchableOpacity style={[styles.circle, { backgroundColor: '#ef4444' }]} onPress={() => setIsCallActive(false)}>
          <Text style={styles.btnText}>Decline</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.circle, { backgroundColor: '#22c55e' }]} onPress={() => setIsCallActive(false)}>
          <Text style={styles.btnText}>Answer</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.sim}>This is a simulated call</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'#000'},
  avatar:{width:100,height:100,borderRadius:50,backgroundColor:'#333',justifyContent:'center',alignItems:'center',marginBottom:20},
  avatarText:{color:'#fff',fontSize:28,fontWeight:'bold'},
  name:{color:'#fff',fontSize:26,fontWeight:'bold'},
  number:{color:'#bbb',fontSize:16,marginBottom:10},
  incoming:{color:'#999',marginBottom:30},
  buttons:{flexDirection:'row',justifyContent:'space-around',width:'80%'},
  circle:{width:80,height:80,borderRadius:40,justifyContent:'center',alignItems:'center'},
  btnText:{color:'#fff',fontWeight:'bold'},
  sim:{color:'#555',fontSize:12,marginTop:40}
});
