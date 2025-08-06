import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";
import { PaymentsContext } from "@/hooks/usePaymentsConfig";
import { initializePayments } from "@/lib/payments";
import { Platform } from "react-native";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [isConfigured, setIsConfigured] = useState(false);
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    const initialize = async () => {
      const key = Platform.select({
        ios: process.env.EXPO_PUBLIC_IOS_API_KEY,
        android: process.env.EXPO_PUBLIC_ANDROID_API_KEY,
        web: process.env.EXPO_PUBLIC_WEB_BILLING_API_KEY,
        default: process.env.EXPO_PUBLIC_IOS_API_KEY,
      });
      if (!key) {
        throw new Error("No API key found");
      }
      await initializePayments(key);
      setIsConfigured(true);
    };

    initialize().catch((error) => {
      console.error("Failed to initialize payments:", error);
    });

    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <PaymentsContext.Provider value={{ isConfigured }}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" />
      </PaymentsContext.Provider>
    </ThemeProvider>
  );
}
