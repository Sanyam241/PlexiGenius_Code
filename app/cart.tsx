import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { router } from "expo-router";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import {
  Animated,
  PanResponder,
  FlatList,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
  Modal,
  StyleSheet,
} from "react-native";
import { scale, verticalScale, moderateScale } from "react-native-size-matters";

// --- Interfaces ---
interface CartItem {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  image: any;
}

interface SwipeableCartItemProps {
  item: CartItem;
  onUpdateQuantity: (id: string, delta: number) => void;
  onDelete: (id: string) => void;
}

interface RemoveFromCartModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

// --- Remove Modal ---
const RemoveFromCartModal: React.FC<RemoveFromCartModalProps> = ({
  visible,
  onClose,
  onConfirm,
}) => (
  <Modal
    visible={visible}
    transparent
    animationType="fade"
    onRequestClose={onClose}
  >
    <View style={modalStyles.overlay}>
      <View style={modalStyles.modalContainer}>
        <Text style={modalStyles.title}>Remove from Cart?</Text>
        <Text style={modalStyles.message}>
          Lorem ipsum dolor sit amet consectetur. Vestibulum eget blandit mattis
        </Text>
        <View style={modalStyles.buttonContainer}>
          <TouchableOpacity
            style={[modalStyles.button, modalStyles.yesButton]}
            onPress={onConfirm}
          >
            <Text style={modalStyles.yesButtonText}>Yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[modalStyles.button, modalStyles.noButton]}
            onPress={onClose}
          >
            <Text style={modalStyles.noButtonText}>No</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  </Modal>
);

// --- Swipeable Cart Item ---
const SwipeableCartItem: React.FC<SwipeableCartItemProps> = ({
  item,
  onUpdateQuantity,
  onDelete,
}) => {
  const [translateX] = useState(new Animated.Value(0));

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) =>
      Math.abs(gestureState.dx) > 5,
    onPanResponderMove: (_, gestureState) => {
      if (gestureState.dx < 0)
        translateX.setValue(Math.max(gestureState.dx, -scale(80)));
    },
    onPanResponderRelease: (_, gestureState) => {
      Animated.spring(translateX, {
        toValue: gestureState.dx < -scale(40) ? -scale(80) : 0,
        useNativeDriver: true,
      }).start();
    },
  });

  const handleDelete = () => {
    Animated.spring(translateX, { toValue: 0, useNativeDriver: true }).start();
    onDelete(item.id);
  };

  return (
    <View style={styles.swipeContainer}>
      <View style={styles.deleteBackground}>
        <TouchableOpacity onPress={handleDelete}>
          <MaterialIcons
            name="delete-forever"
            size={moderateScale(28)}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
      <Animated.View
        style={[styles.cartItem, { transform: [{ translateX }] }]}
        {...panResponder.panHandlers}
      >
        <View style={styles.itemImageContainer}>
          <Image
            source={item.image}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: moderateScale(16),
            }}
            resizeMode="contain"
          />
        </View>
        <View style={styles.itemContent}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemDescription}>{item.description}</Text>
          <Text style={styles.itemPrice}>${item.price}</Text>
        </View>
        <View style={styles.quantityContainer}>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => onUpdateQuantity(item.id, -1)}
          >
            <Text style={styles.quantityButtonText}>−</Text>
          </TouchableOpacity>
          <Text style={styles.quantityText}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.quantityButton}
            onPress={() => onUpdateQuantity(item.id, 1)}
          >
            <Text style={styles.quantityButtonText}>+</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>
    </View>
  );
};

// --- Cart Screen ---
const CartScreen: React.FC = () => {
  const navigation = useNavigation();
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "Robusta",
      description: "With Milk",
      price: 20,
      quantity: 1,
      image: require("../assets/images/robusta.png"),
    },
    {
      id: "2",
      name: "Liberica",
      description: "With Water",
      price: 12,
      quantity: 1,
      image: require("../assets/images/liberica.png"),
    },
    {
      id: "3",
      name: "Citrus",
      description: "With Lemon",
      price: 12,
      quantity: 1,
      image: require("../assets/images/liberica.png"),
    },
  ]);

  const [couponCode, setCouponCode] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<string | null>(null);

  const updateQuantity = (id: string, delta: number) =>
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );

  const handleDeleteRequest = (id: string) => {
    setItemToDelete(id);
    setModalVisible(true);
  };
  const confirmDelete = () => {
    if (itemToDelete)
      setCartItems((items) => items.filter((item) => item.id !== itemToDelete));
    setModalVisible(false);
    setItemToDelete(null);
  };
  const cancelDelete = () => {
    setItemToDelete(null);
    setModalVisible(false);
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 6;
  const total = subtotal + shipping;

  const renderItem = ({ item }: { item: CartItem }) => (
    <SwipeableCartItem
      item={item}
      onUpdateQuantity={updateQuantity}
      onDelete={handleDeleteRequest}
    />
  );

  const ListFooter = () => (
    <View style={{ paddingBottom: verticalScale(100) }}>
      <View style={styles.combinedContainer}>
        <View style={styles.couponContainer}>
          <TextInput
            style={styles.couponInput}
            placeholder="Enter Coupon Code here"
            placeholderTextColor="rgba(84, 58, 42, 0.5)"
            value={couponCode}
            onChangeText={setCouponCode}
          />
          <TouchableOpacity style={styles.applyButton}>
            <Text style={styles.applyButtonText}>Apply</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.summaryContainer}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Sub-total</Text>
            <View style={styles.dottedLine} />
            <Text style={styles.summaryValue}>${subtotal}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Shipping</Text>
            <View style={styles.dottedLine} />
            <Text style={styles.summaryValue}>${shipping}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <View style={styles.dottedLine} />
            <Text style={styles.totalValue}>${total}</Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.finalizeButton}>
        <Text style={styles.finalizeButtonText}>Finalize Order</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#543A20" barStyle="light-content" />
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.goBack()}
        >
          <MaterialIcons
            name="arrow-back"
            size={moderateScale(22)}
            color="#fff"
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cart</Text>
        <TouchableOpacity
          style={styles.notificationButton}
          onPress={() => router.push("/notification")}
        >
          <MaterialIcons
            name="notifications-none"
            size={moderateScale(24)}
            color="#fff"
          />
        </TouchableOpacity>
      </View>

      <FlatList
        data={cartItems}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={
          <View style={styles.orderHeader}>
            <Text style={styles.orderTitle}>My Order</Text>
            <Text style={styles.orderSubtitle}>
              You have <Text style={styles.itemCount}>{cartItems.length}</Text>{" "}
              items in your cart
            </Text>
          </View>
        }
        ListFooterComponent={ListFooter}
        showsVerticalScrollIndicator={false}
      />

      <RemoveFromCartModal
        visible={modalVisible}
        onClose={cancelDelete}
        onConfirm={confirmDelete}
      />
    </View>
  );
};

export default CartScreen;

// --- Styles ---
const modalStyles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: scale(20),
  },
  modalContainer: {
    backgroundColor: "#C89968",
    borderRadius: moderateScale(12),
    padding: scale(24),
    width: "90%",
    maxWidth: scale(400),
    alignItems: "center",
  },
  title: {
    fontSize: moderateScale(20),
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: verticalScale(12),
    textAlign: "center",
  },
  message: {
    fontSize: moderateScale(14),
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: verticalScale(24),
    lineHeight: moderateScale(20),
    opacity: 0.9,
  },
  buttonContainer: {
    flexDirection: "row",
    gap: scale(12),
    width: "100%",
  },
  button: {
    flex: 1,
    paddingVertical: verticalScale(14),
    paddingHorizontal: scale(20),
    borderRadius: moderateScale(8),
    alignItems: "center",
    justifyContent: "center",
  },
  yesButton: { backgroundColor: "#3E2E21" },
  yesButtonText: {
    fontSize: moderateScale(16),
    fontWeight: "600",
    color: "#FFFFFF",
  },
  noButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#3E2E21",
  },
  noButtonText: {
    fontSize: moderateScale(16),
    fontWeight: "600",
    color: "#3E2E21",
  },
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#543A2A",
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(40),
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: verticalScale(15),
  },
  notificationButton: {
    width: scale(40),
    height: scale(40),
    justifyContent: "center",
    alignItems: "center",
  },
  iconButton: { padding: moderateScale(6) },
  headerTitle: {
    fontSize: moderateScale(20),
    fontWeight: "700",
    color: "#fff",
  },
  orderHeader: { marginTop: verticalScale(4), marginBottom: verticalScale(20) },
  orderTitle: {
    fontSize: moderateScale(28),
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: verticalScale(6),
  },
  orderSubtitle: {
    fontSize: moderateScale(14),
    color: "rgba(255,255,255,0.7)",
  },
  itemCount: { fontWeight: "600", color: "#FFFFFF" },
  swipeContainer: {
    marginBottom: verticalScale(16),
    height: verticalScale(92),
  },
  deleteBackground: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: scale(80),
    justifyContent: "center",
    alignItems: "center",
  },
  cartItem: {
    backgroundColor: "#CE9760",
    borderRadius: moderateScale(10),
    padding: scale(16),
    flexDirection: "row",
    alignItems: "center",
    height: verticalScale(92),
  },
  itemImageContainer: {
    width: scale(65),
    height: scale(65),
    borderRadius: moderateScale(16),
    justifyContent: "center",
    alignItems: "center",
    marginRight: scale(14),
  },
  itemContent: { flex: 1, justifyContent: "center" },
  itemName: {
    fontSize: moderateScale(18),
    fontWeight: "700",
    color: "#FFFFFF",
    marginBottom: verticalScale(2),
  },
  itemDescription: {
    fontSize: moderateScale(12),
    color: "rgba(84,58,32,1)",
    fontWeight: "600",
    marginBottom: verticalScale(6),
  },
  itemPrice: {
    fontSize: moderateScale(14),
    fontWeight: "600",
    color: "rgba(57,38,11,1)",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: moderateScale(24),
    paddingHorizontal: scale(6),
    paddingVertical: verticalScale(6),
  },
  quantityButton: {
    width: scale(32),
    height: scale(32),
    borderRadius: moderateScale(15),
    backgroundColor: "rgba(84,58,32,1)",
    justifyContent: "center",
    alignItems: "center",
  },
  quantityButtonText: {
    fontSize: moderateScale(18),
    fontWeight: "600",
    color: "#FFFFFF",
    lineHeight: moderateScale(20),
  },
  quantityText: {
    fontSize: moderateScale(16),
    fontWeight: "600",
    color: "#2C1810",
    marginHorizontal: scale(16),
    minWidth: scale(20),
    textAlign: "center",
  },
  combinedContainer: { marginBottom: verticalScale(24) },
  couponContainer: {
    flexDirection: "row",
    marginBottom: verticalScale(12),
    gap: scale(10),
    backgroundColor: "rgba(206,151,96,1)",
    borderRadius: moderateScale(16),
    padding: scale(16),
  },
  couponInput: {
    flex: 1,
    backgroundColor: "rgba(255,255,255,0.3)",
    borderRadius: moderateScale(12),
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(14),
    fontSize: moderateScale(13),
    color: "#543A2A",
  },
  applyButton: {
    backgroundColor: "#5C3A2A",
    borderRadius: moderateScale(12),
    paddingHorizontal: scale(28),
    justifyContent: "center",
    alignItems: "center",
  },
  applyButtonText: {
    fontSize: moderateScale(15),
    fontWeight: "600",
    color: "#FFFFFF",
  },
  summaryContainer: {
    backgroundColor: "rgba(206,151,96,1)",
    borderRadius: moderateScale(16),
    padding: scale(16),
  },
  summaryRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: verticalScale(10),
  },
  dottedLine: {
    flex: 1,
    height: 1,
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255,255,255,0.3)",
    borderStyle: "dotted",
    marginHorizontal: scale(8),
  },
  summaryLabel: { fontSize: moderateScale(15), color: "rgba(255,255,255,0.8)" },
  summaryValue: {
    fontSize: moderateScale(15),
    color: "rgba(255,255,255,0.9)",
    fontWeight: "500",
  },
  totalLabel: {
    fontSize: moderateScale(16),
    fontWeight: "700",
    color: "#FFFFFF",
  },
  totalValue: {
    fontSize: moderateScale(16),
    fontWeight: "700",
    color: "#FFFFFF",
  },
  finalizeButton: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#C9A36A",
    borderRadius: moderateScale(20),
    paddingVertical: verticalScale(18),
    alignItems: "center",
    marginTop: verticalScale(12),
  },
  finalizeButtonText: {
    fontSize: moderateScale(18),
    fontWeight: "600",
    color: "#FFFFFF",
  },
});