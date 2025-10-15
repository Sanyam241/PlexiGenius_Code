import EvilIcons from "@expo/vector-icons/EvilIcons";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import { moderateScale, scale, verticalScale } from "react-native-size-matters";
import { useRouter } from "expo-router";

Dimensions.get("window");

export default function HomeScreen() {
  const router = useRouter();

  const coffeeData = [
    {
      name: "Arabica",
      price: "$18",
      image: require("../assets/images/arabica.png"),
    },
    {
      name: "Robusta",
      price: "$20",
      image: require("../assets/images/robusta.png"),
    },
    {
      name: "Excelsa",
      price: "$15",
      image: require("../assets/images/excelsa.png"),
    },
    {
      name: "Liberica",
      price: "$12",
      image: require("../assets/images/liberica.png"),
    },
  ];

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.header}>
          <Image
            source={require("../assets/images/profile.png")}
            style={styles.profileImage}
          />
          <View style={styles.userInfo}>
            <Text style={styles.username}>Shahzaib</Text>
            <Text style={styles.greeting}>Good Morning!</Text>
          </View>

          <View style={styles.iconsContainer}>
            <EvilIcons name="search" size={scale(28)} color="#fff" />
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
        </View>

        <View style={styles.offerCard}>
          <View style={styles.offerTextContainer}>
            <Text style={styles.offerTitle}>
              Get 20% Discount{"\n"}On Your First Order!
            </Text>
            <Text style={styles.offerSubtitle}>
              Lorem ipsum dolor sit amet consectetur.
            </Text>
          </View>
          <Image
            source={require("../assets/images/coffee.png")}
            style={styles.offerImage}
          />
        </View>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.categoryRow}
          contentContainerStyle={styles.categoryContent}
        >
          {["Hot Coffees", "Ice Teas", "Hot Teas", "Drinks", "Bakery"].map(
            (cat, i) => (
              <Text
                key={i}
                style={[styles.category, i === 0 && styles.categoryActive]}
              >
                {cat}
              </Text>
            )
          )}
        </ScrollView>

        <View style={styles.grid}>
          {coffeeData.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.card}
              onPress={() =>
                router.push({
                  pathname: "/singleproduct",
                  params: { name: item.name, price: item.price },
                })
              }
            >
              <Image source={item.image} style={styles.coffeeImage} />
              <Text style={styles.coffeeName}>{item.name}</Text>
              <Text style={styles.coffeeDesc}>
                Lorem ipsum dolor sit amet cons
              </Text>
              <Text style={styles.coffeePrice}>{item.price}</Text>
            </TouchableOpacity>
          ))}
        </View>


        <View style={{ height: verticalScale(80) }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#543A20" },
  scrollView: { flex: 1 },
  scrollContent: {
    paddingHorizontal: scale(15),
    paddingTop: verticalScale(40),
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  notificationButton: {
    width: scale(40),
    height: scale(40),
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: scale(60),
    height: scale(60),
    borderRadius: scale(40),
  },
  userInfo: { flex: 1, marginLeft: scale(10) },
  username: {
    color: "#FFFFFF",
    fontSize: moderateScale(22),
    fontWeight: "600",
    fontFamily: "Poppins",
  },
  greeting: {
    color: "#E3E3E3",
    fontSize: moderateScale(18),
    fontWeight: "300",
    fontFamily: "Poppins",
  },
  iconsContainer: { flexDirection: "row", alignItems: "center" },
  offerCard: {
    backgroundColor: "rgba(206, 151, 96, 0.49)",
    borderRadius: scale(10),
    padding: scale(15),
    marginTop: verticalScale(25),
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    height: verticalScale(146),
  },
  offerTextContainer: {
    flex: 1,
    paddingRight: scale(10),
    justifyContent: "center",
    gap: verticalScale(9),
  },
  offerTitle: {
    color: "#FFFFFF",
    fontSize: moderateScale(18),
    fontWeight: "600",
    fontFamily: "Poppins",
    lineHeight: moderateScale(27),
  },
  offerSubtitle: {
    color: "#FFFFFF",
    fontSize: moderateScale(11),
    fontWeight: "400",
    fontFamily: "Poppins",
  },
  offerImage: { width: scale(129), height: scale(119), resizeMode: "contain" },
  categoryRow: { marginTop: verticalScale(20), maxHeight: verticalScale(19) },
  categoryContent: { paddingRight: scale(15), gap: verticalScale(20) },
  category: {
    color: "#F5F5F5",
    fontSize: moderateScale(14),
    marginRight: scale(16),
    fontWeight: "500",
    fontFamily: "Inter",
    lineHeight: moderateScale(10),
  },
  categoryActive: {
    color: "#CE9760",
    fontWeight: "600",
    lineHeight: moderateScale(10),
  },
  grid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: verticalScale(15),
    width: scale(344.83),
  },
  card: {
    width: scale(163.55),
    backgroundColor: "#CE9760",
    borderRadius: scale(7),
    padding: scale(6),
    marginBottom: verticalScale(12),
    alignItems: "center",
  },
  coffeeImage: {
    width: verticalScale(83.74),
    height: verticalScale(79),
    resizeMode: "cover",
  },
  coffeeName: {
    color: "#FFFFFF",
    fontSize: moderateScale(18),
    fontWeight: "600",
    marginTop: verticalScale(5),
    fontFamily: "Inter",
  },
  coffeeDesc: {
    color: "rgba(57, 38, 11, 1)",
    fontSize: moderateScale(9),
    fontFamily: "Poppins",
    fontWeight: "600",
  },
  coffeePrice: {
    color: "rgba(57, 38, 11, 1)",
    fontSize: moderateScale(16),
    fontWeight: "800",
    marginTop: verticalScale(5),
    fontFamily: "Inter",
  },
});
