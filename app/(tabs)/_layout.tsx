import { Tabs } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ color, size }) => {
          let iconName: any;
          if (route.name === "index") iconName = "home";
          else if (route.name === "templates") iconName = "people";
          else if (route.name === "settings") iconName = "settings";
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#a855f7",
        tabBarInactiveTintColor: "gray",
      })}
    />
  );
}
