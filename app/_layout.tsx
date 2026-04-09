import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Trang chủ" }} />
      <Stack.Screen name="weather" options={{ title: "Weather" }} />
      <Stack.Screen name="countries" options={{ title: "Countries" }} />
    </Stack>
  );
}