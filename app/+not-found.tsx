import { View, Text, Button } from "react-native";
import { Link } from "expo-router";

export default function NotFoundScreen() {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={{ fontSize: 20, marginBottom: 20 }}>Page not found</Text>
      <Link href="/home" asChild>
        <Button title="Go Home" />
      </Link>
    </View>
  );
}
