import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { useContext } from "react";
import { AppContext } from "../context/AppContext";
import { useRouter } from "expo-router";

export default function HomeScreen() {
  const { triggerFakeCall, countdown, scheduledTime, cancelScheduled } = useContext(AppContext);
  const router = useRouter();

  return (
    <View style={styles.container}>
      {(countdown || scheduledTime) && (
        <View style={styles.card}>
          <Text style={styles.title}>{countdown ? "Call in:" : "Scheduled for:"}</Text>
          <Text style={styles.time}>
            {countdown
              ? `${Math.floor(countdown / 60)}:${(countdown % 60).toString().padStart(2, "0")}`
              : new Date(scheduledTime).toLocaleTimeString()}
          </Text>
          <TouchableOpacity onPress={cancelScheduled} style={styles.cancelButton}>
            <Text style={styles.cancelText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      )}

      <TouchableOpacity onPress={triggerFakeCall} style={styles.bigButton}>
        <Text style={styles.bigText}>Fake Call</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push("/schedule")} style={styles.link}>
        <Text style={styles.linkText}>Schedule a Call</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#111" },
  bigButton: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: "#ef4444",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  bigText: { color: "#fff", fontSize: 22, fontWeight: "bold" },
  card: {
    padding: 20,
    backgroundColor: "#222",
    borderRadius: 15,
    marginBottom: 30,
    alignItems: "center",
  },
  title: { color: "#bbb", fontSize: 16 },
  time: { color: "#fff", fontSize: 24, fontWeight: "bold" },
  cancelButton: { marginTop: 10, padding: 8, backgroundColor: "#ef4444", borderRadius: 10 },
  cancelText: { color: "#fff" },
  link: { marginTop: 20 },
  linkText: { color: "#3b82f6", fontSize: 16 },
});
