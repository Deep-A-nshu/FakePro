import React, { useContext } from "react";
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { AppContext } from "../app/context/AppContext";

export default function ScheduleScreen() {
  const router = useRouter();
  const { setCountdown, setScheduledTime } = useContext(AppContext);

  const quickSchedule = (minutes: number) => {
    setCountdown(minutes * 60);
    router.back();
  };

  const scheduleCustomTime = (time: string) => {
    const now = new Date();
    const [hours, mins] = time.split(":").map((n) => parseInt(n, 10));
    const scheduled = new Date(now);
    scheduled.setHours(hours, mins, 0, 0);
    if (scheduled <= now) scheduled.setDate(scheduled.getDate() + 1);
    setScheduledTime(scheduled.toISOString());
    router.back();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Schedule Fake Call</Text>
      <Text style={styles.subheading}>Quick Schedule</Text>
      <View style={styles.quickRow}>
        {[1, 2, 5, 10, 15, 30].map((m) => (
          <TouchableOpacity key={m} onPress={() => quickSchedule(m)} style={styles.quickBtn}>
            <Text style={styles.quickText}>{m} min</Text>
          </TouchableOpacity>
        ))}
      </View>

      <Text style={styles.subheading}>Custom Time (HH:MM)</Text>
      <TextInput
        placeholder="14:30"
        placeholderTextColor="#666"
        style={styles.input}
        onSubmitEditing={(e) => scheduleCustomTime(e.nativeEvent.text)}
        keyboardType="numbers-and-punctuation"
        returnKeyType="done"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111", padding: 20 },
  heading: { color: "#fff", fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  subheading: { color: "#bbb", fontSize: 18, marginTop: 20, marginBottom: 10 },
  quickRow: { flexDirection: "row", flexWrap: "wrap" },
  quickBtn: { backgroundColor: "#333", padding: 15, borderRadius: 10, margin: 5 },
  quickText: { color: "#fff" },
  input: { backgroundColor: "#222", color: "#fff", padding: 15, borderRadius: 10, fontSize: 16 },
});
