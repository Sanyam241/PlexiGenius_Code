import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  Image,
  ScrollView,
} from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { Ionicons, Feather } from "@expo/vector-icons";
import { router } from "expo-router";


const ProfileScreen = () => {
  const menuItems = [
    { id: 1, icon: "person", label: "Your Profile" },
    { id: 2, icon: "receipt", label: "My Orders" },
    { id: 3, icon: "settings", label: "Setting" },
    { id: 4, icon: "lock-closed", label: "Privacy Policy" },
    { id: 5, icon: "person-add", label: "Invite Friend" },
    { id: 6, icon: "log-out", label: "Logout" },
  ];

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="rgba(84, 58, 32, 1)" />

      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons name="chevron-back" size={moderateScale(24)} color="#fff"  onPress={() => router.back()}/>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
        <TouchableOpacity
          style={styles.notificationButton}
          onPress={() => router.push("/notification")}
        >
          <Ionicons
            name="notifications-outline"
            size={moderateScale(24)}
            color="#fff"
          />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.profileSection}>
          <View style={styles.avatarContainer}>
            <Image
              source={require("../../assets/images/profile.png")}
              style={styles.avatar}
            />
            <TouchableOpacity style={styles.editButton}>
              <Feather name="edit-2" size={moderateScale(14)} color="#543A20" />
            </TouchableOpacity>
          </View>
          <Text style={styles.userName}>Shahzaib R.</Text>
        </View>

        <View style={styles.menuContainer}>
          {menuItems.map((item) => (
            <TouchableOpacity 
              key={item.id} 
              style={styles.menuItem}
              onPress={() => {
                if (item.id === 2) {
                  router.push("/myorder");
                }
              }}
            >
              <View style={styles.menuIconContainer}>
                <Ionicons
                  name={item.icon as any}
                  size={moderateScale(22)}
                  color="#fff"
                />
              </View>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Ionicons
                name="chevron-forward"
                size={moderateScale(20)}
                color="#fff"
                style={styles.chevron}
              />
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "rgba(84, 58, 32, 1)" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(50),
    paddingBottom: verticalScale(20),
  },
  backButton: {
    width: scale(40),
    height: scale(40),
    justifyContent: "center",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: moderateScale(20),
    fontWeight: "600",
    color: "#fff",
  },
  notificationButton: {
    width: scale(40),
    height: scale(40),
    justifyContent: "center",
    alignItems: "center",
  },
  profileSection: {
    alignItems: "center",
    paddingVertical: verticalScale(30),
  },
  avatarContainer: {
    position: "relative",
    marginBottom: verticalScale(15),
  },
  avatar: {
    width: scale(90),
    height: scale(90),
    borderRadius: scale(45),
    borderWidth: 3,
    borderColor: "#C9A26F",
  },
  editButton: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: "#C9A26F",
    width: scale(32),
    height: scale(32),
    borderRadius: scale(16),
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "rgba(84, 58, 32, 1)",
  },
  userName: { fontSize: moderateScale(22), fontWeight: "600", color: "#fff" },
  menuContainer: {
    paddingHorizontal: scale(20),
    paddingBottom: verticalScale(100),
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(115, 82, 52, 0.5)",
    borderRadius: moderateScale(15),
    padding: moderateScale(18),
    marginBottom: verticalScale(15),
  },
  menuIconContainer: {
    width: scale(45),
    height: scale(45),
    borderRadius: scale(22.5),
    backgroundColor: "rgba(150, 110, 70, 0.6)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: scale(15),
  },
  menuLabel: {
    flex: 1,
    fontSize: moderateScale(16),
    color: "#fff",
    fontWeight: "500",
  },
  chevron: { opacity: 0.7 },
});

export default ProfileScreen;