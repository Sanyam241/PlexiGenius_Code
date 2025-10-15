import Ionicons from '@expo/vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { router } from "expo-router";
import React from 'react';
import {
  FlatList,
  Image,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';

interface CoffeeItem {
  id: string;
  name: string;
  price: string;
  image: any;
}

const coffeeData: CoffeeItem[] = [
  {
    id: '1',
    name: 'Arabica',
    price: '$18',
    image: require('../../assets/images/arabica.png'),
  },
  {
    id: '2',
    name: 'Robusta',
    price: '$20',
    image: require('../../assets/images/robusta.png'),
  },
  {
    id: '3',
    name: 'Excelsa',
    price: '$15',
    image: require('../../assets/images/excelsa.png'),
  },
  {
    id: '4',
    name: 'Liberica',
    price: '$12',
    image: require('../../assets/images/liberica.png'),
  },
];

const FavouriteScreen: React.FC = () => {
  const navigation = useNavigation();

  const renderItem = ({ item }: { item: CoffeeItem }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} resizeMode="contain" />
      <TouchableOpacity style={styles.heartIcon}>
        <Ionicons name="heart" size={moderateScale(18)} color="red" />
      </TouchableOpacity>
      <Text style={styles.title}>{item.name}</Text>
      <Text style={styles.price}>{item.price}</Text>
      <Text style={styles.desc}>Lorem ipsum dolor sit amet cons</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#543A20" barStyle="light-content" />

      {/* Header with Back + Title + Bell */}
      <View style={styles.headerContainer}>
        <TouchableOpacity
          style={styles.iconButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={moderateScale(22)} color="#fff" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Favourite</Text>

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

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          placeholder="Search Your Favorite Product"
          placeholderTextColor="#999"
          style={styles.searchInput}
        />
        <TouchableOpacity style={styles.searchBtn}>
          <Ionicons name="search" size={moderateScale(18)} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Coffee Grid */}
      <FlatList
        data={coffeeData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default FavouriteScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(84, 58, 32, 1)',
    paddingHorizontal: scale(16),
    paddingTop: verticalScale(40),
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(15),
  },
  notificationButton: {
    width: scale(40),
    height: scale(40),
    justifyContent: "center",
    alignItems: "center",
  },
  iconButton: {
    padding: moderateScale(6),
  },
  headerTitle: {
    fontSize: moderateScale(20),
    fontWeight: '700',
    color: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: moderateScale(10),
    marginBottom: verticalScale(20),
    paddingHorizontal: scale(10),
  },
  searchInput: {
    flex: 1,
    height: verticalScale(40),
    color: '#000',
    fontSize: moderateScale(12),
  },
  searchBtn: {
    backgroundColor: '#543A20',
    borderRadius: moderateScale(8),
    padding: moderateScale(8),
  },
  listContainer: {
    paddingBottom: verticalScale(100),
  },
  card: {
    width: '48%',
    backgroundColor: '#C69C6D',
    borderRadius: moderateScale(10),
    marginBottom: verticalScale(15),
    padding: moderateScale(10),
    position: 'relative',
  },
  image: {
    width: '100%',
    height: verticalScale(90),
    borderRadius: moderateScale(8),
  },
  heartIcon: {
    position: 'absolute',
    top: scale(8),
    right: scale(8),
  },
  title: {
    fontSize: moderateScale(14),
    fontWeight: '600',
    color: '#000',
    marginTop: verticalScale(8),
  },
  price: {
    fontSize: moderateScale(12),
    color: '#000',
    marginTop: verticalScale(4),
  },
  desc: {
    fontSize: moderateScale(10),
    color: '#444',
    marginTop: verticalScale(4),
  },
});
