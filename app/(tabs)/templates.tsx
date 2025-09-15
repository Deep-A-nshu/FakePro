import React, { useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { AppContext, AppProvider } from "../context/AppContext";


export default function TemplatesScreen({ navigation }) {
  const { templates, setCallSettings } = useContext(AppContext);

  const applyTemplate = (t) => {
    setCallSettings((prev) => ({
      ...prev,
      callerName: t.caller,
      callerNumber: t.number,
      callerAvatar: t.icon,
      message: t.message
    }));
    navigation.navigate('Home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Quick Templates</Text>
        <TouchableOpacity onPress={() => navigation.navigate('AddTemplate')}>
          <Text style={styles.add}>+ Add</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={templates}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.card} onPress={() => applyTemplate(item)}>
            <View style={styles.avatar}><Text style={styles.avatarText}>{item.icon}</Text></View>
            <View>
              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.caller}>{item.caller}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{flex:1,backgroundColor:'#111',padding:20},
  header:{flexDirection:'row',justifyContent:'space-between',alignItems:'center'},
  heading:{color:'#fff',fontSize:24,fontWeight:'bold'},
  add:{color:'#22c55e',fontSize:18,fontWeight:'bold'},
  card:{flexDirection:'row',alignItems:'center',backgroundColor:'#222',padding:15,borderRadius:12,marginTop:15},
  avatar:{width:50,height:50,borderRadius:25,backgroundColor:'#444',justifyContent:'center',alignItems:'center',marginRight:15},
  avatarText:{color:'#fff',fontSize:18,fontWeight:'bold'},
  name:{color:'#fff',fontSize:18,fontWeight:'600'},
  caller:{color:'#aaa',fontSize:14}
});
