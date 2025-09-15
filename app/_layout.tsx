import { Slot } from "expo-router";
import { AppContext, AppProvider } from "../app/context/AppContext";

export default function RootLayout() {
  return (
    <AppProvider>
      <Slot />
    </AppProvider>
  );
}