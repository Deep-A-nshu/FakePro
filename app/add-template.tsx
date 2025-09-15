import React, { useContext, useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { AppContext } from "../app/context/AppContext";

type Form = {
  name: string;
  caller: string;
  number: string;
  message: string;
  icon: string;
};

type Template = {
  id: string;
  name: string;
  caller: string;
  number: string;
  message: string;
  icon: string;
};

export default function AddTemplateScreen() {
  const router = useRouter();
  const { setTemplates } = useContext(AppContext);
  const [form, setForm] = useState<Form>({ name: "", caller: "", number: "", message: "", icon: "" });

  const addTemplate = () => {
    if (!form.name || !form.caller) return;
    const newT: Template = {
      id: `custom-${Date.now()}`,
      ...form,
      icon: form.icon || form.caller.substring(0, 2).toUpperCase(),
    };
    setTemplates((prev: Template[]) => [...prev, newT]);
    router.back();
  };

  const fields: (keyof Form)[] = ["name", "caller", "number", "message", "icon"];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Add Custom Template</Text>

      {fields.map((f) => (
        <TextInput
          key={f}
          placeholder={f}
          placeholderTextColor="#666"
          value={form[f]}
          onChangeText={(val) => setForm({ ...form, [f]: val })}
          style={[styles.input, f === "message" && { height: 100 }]}
          multiline={f === "message"}
          keyboardType={f === "number" ? "phone-pad" : "default"}
          maxLength={f === "icon" ? 2 : undefined}
        />
      ))}

      <TouchableOpacity style={styles.btn} onPress={addTemplate}>
        <Text style={styles.btnText}>Add Template</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#111", padding: 20 },
  heading: { color: "#fff", fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  input: { backgroundColor: "#222", color: "#fff", padding: 15, borderRadius: 10, fontSize: 16, marginBottom: 15 },
  btn: { backgroundColor: "#3b82f6", padding: 15, borderRadius: 12, alignItems: "center" },
  btnText: { color: "#fff", fontWeight: "bold", fontSize: 16 },
});
