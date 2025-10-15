import React from "react";
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";

type Order = {
  id: string;
  name: string;
  qty: number;
  price: number;
  status: "in progress" | "delivered";
  image: any;
};

const orders: Order[] = [
  {
    id: "1",
    name: "Robusta",
    qty: 2,
    price: 40,
    status: "in progress",
    image: require("../../assets/images/robusta.png"),
  },
  {
    id: "2",
    name: "Liberica",
    qty: 2,
    price: 24,
    status: "in progress",
    image: require("../../assets/images/liberica.png"),
  },
  {
    id: "3",
    name: "Cirtus",
    qty: 2,
    price: 24,
    status: "delivered",
    image: require("../../assets/images/excelsa.png"),
  },
  {
    id: "4",
    name: "Liberica",
    qty: 2,
    price: 24,
    status: "delivered",
    image: require("../../assets/images/liberica.png"),
  },
  {
    id: "5",
    name: "Robusta",
    qty: 2,
    price: 24,
    status: "delivered",
    image: require("../../assets/images/robusta.png"),
  },
];

const MyOrdersScreen = () => {
  const renderItem = ({ item }: { item: Order }) => (
    <View style={styles.card}>
      <View style={styles.imageWrapper}>
        <Image source={item.image} style={styles.image} resizeMode="contain" />
      </View>
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.qty}>Qty: {item.qty}</Text>
        <Text style={styles.price}>${item.price}</Text>
        <Text>{item.status}</Text>
      </View>
      <TouchableOpacity
        style={[
          styles.button,
          item.status === "in progress"
            ? styles.trackButton
            : styles.completeButton,
        ]}
      >
        <Text
          style={[
            styles.buttonText,
            item.status === "in progress"
              ? { color: "#fff" }
              : { color: "#A05A2C" },
          ]}
        >
          {item.status === "in progress" ? "Track" : "Complete"}
        </Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <Ionicons
            name="chevron-back"
            size={moderateScale(24)}
            color="#fff"
            onPress={() => router.back()}
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Orders</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Orders List */}
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default MyOrdersScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  header: {
    backgroundColor: "#543A26",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: scale(16),
    height: verticalScale(120),
    borderBottomLeftRadius: scale(20),
    borderBottomRightRadius: scale(20),
  },
  backButton: {
    width: scale(40),
    justifyContent: "center",
  },
  backIcon: {
    color: "#FFFFFF",
    fontSize: moderateScale(24),
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: moderateScale(22),
    fontWeight: "700",
  },
  placeholder: {
    width: scale(40),
  },
  list: {
    padding: scale(10),
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: scale(12),
    marginVertical: verticalScale(6),
    padding: scale(10),
  },
  imageWrapper: {
    backgroundColor: "rgba(206, 151, 96, 1)",
    padding: scale(8),
    borderRadius: scale(12),
    marginRight: scale(10),
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: scale(60),
    height: scale(60),
  },
  infoContainer: {
    flex: 1,
  },
  name: {
    fontSize: moderateScale(18),
    fontWeight: "700",
    fontFamily: "Inter",
    color: "rgba(84, 58, 32, 1)",
  },
  qty: {
    fontSize: moderateScale(12),
    fontWeight: "500",
    fontFamily: "Inter",
    color: "rgba(0, 0, 0, 0.49)",
    marginTop: verticalScale(2),
  },
  price: {
    fontSize: moderateScale(16),
    fontWeight: "600",
    fontFamily: "Inter",
    color: "rgba(84, 58, 32, 1)",
  },
  status: {
    fontSize: moderateScale(12),
    marginTop: verticalScale(2),
    fontWeight: "500",
    fontFamily: "Inter",
    color: "rgba(0, 0, 0, 0.49)",
  },
  button: {
    borderRadius: scale(10),
    paddingVertical: verticalScale(6),
    paddingHorizontal: scale(12),
  },
  trackButton: {
    backgroundColor: "rgba(206, 151, 96, 1)",
  },
  completeButton: {
    borderWidth: 1,
    borderColor: "rgba(206, 151, 96, 1)",
  },
  buttonText: {
    fontSize: moderateScale(12),
    fontWeight: "600",
  },
});
