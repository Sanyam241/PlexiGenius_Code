import { Stack, usePathname, Redirect } from "expo-router";
import { View, StyleSheet } from "react-native";
import BottomNav from "../component/BottomNav";

export default function RootLayout() {
  const pathname = usePathname();
  if (pathname === "/") {
    return <Redirect href="/home" />;
  }

  const hideNav =
    pathname === "/singleproduct" ||
    pathname === "/myorder" ||
    pathname === "/notification";

  return (
    <View style={styles.container}>
      <Stack screenOptions={{ headerShown: false }} />
      {!hideNav && <BottomNav />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#543A20" },
});
