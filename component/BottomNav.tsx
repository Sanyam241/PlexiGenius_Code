import React, { useEffect, useState } from "react";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { useRouter, usePathname } from "expo-router";
import { scale, verticalScale } from "react-native-size-matters";

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();
  const [activeTab, setActiveTab] = useState("home");

  useEffect(() => {
    const routeName = pathname.replace("/", "") || "home";
    setActiveTab(routeName);
  }, [pathname]);

  const tabs = [
    { name: "home", icon: "home" },
    { name: "cart", icon: "basket" },
    { name: "favorites", icon: "heart" },
    { name: "profile", icon: "user" },
  ];

  const handlePress = (tabName: string) => {
    setActiveTab(tabName);
    router.push(`/${tabName}` as any);
  };

  return (
    <View style={styles.bottomNav}>
      {tabs.map((tab, index) => {
        const isActive = activeTab === tab.name;
        return (
          <TouchableOpacity
            key={index}
            style={[styles.iconContainer, isActive && styles.activeIconContainer]}
            onPress={() => handlePress(tab.name)}
            activeOpacity={0.7}
          >
            <SimpleLineIcons
              name={tab.icon as any}
              size={scale(23)}
              color={isActive ? "#fff" : "#000"} 
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#C48A4A",
    borderTopLeftRadius: scale(25),
    borderTopRightRadius: scale(25),
    paddingVertical: verticalScale(15),
    paddingBottom: verticalScale(20),
  },
  iconContainer: {
    padding: scale(8),
    borderRadius: scale(20),
  },
  activeIconContainer: {
    backgroundColor: "rgba(84, 58, 32, 1)",
  },
});
