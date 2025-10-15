
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { router } from 'expo-router';
import React from 'react';
import {
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { Ionicons, Feather } from "@expo/vector-icons";

interface NotificationItem {
  id: string;
  icon: string | React.ReactNode;
  title: string;
  description: string;
  time: string;
}

const NotificationScreen: React.FC = () => {
  const todayNotifications: NotificationItem[] = [
    {
      id: '1',
      icon: <FontAwesome5 name="bicycle" size={24} color="black" />,
      title: 'Order Delivered',
      description: 'Lorem ipsum dolor sit amet consectetur. Scelerisque',
      time: '1h',
    },
    {
      id: '2',
      icon: <FontAwesome5 name="percent" size={24} color="black" />,
      title: '20% discount Alert',
      description: 'Lorem ipsum dolor sit amet consectetur. Scelerisque',
      time: '2h',
    },
  ];

  const yesterdayNotifications: NotificationItem[] = [
    {
      id: '4',
      icon: <FontAwesome5 name="bicycle" size={24} color="black" />,
      title: 'Order Delivered',
      description: 'Lorem ipsum dolor sit amet consectetur. Scelerisque',
      time: '1d',
    },
    {
      id: '5',
      icon: <FontAwesome5 name="percent" size={24} color="black" />,
      title: '20% discount Alert',
      description: 'Lorem ipsum dolor sit amet consectetur. Scelerisque',
      time: '1d',
    },
    {
      id: '6',
      icon: <Feather name="heart" size={24} color="black" />,
      title: 'New Product launch',
      description: 'Lorem ipsum dolor sit amet consectetur. Scelerisque',
      time: '1d',
    },
  ];

  const renderNotificationItem = (item: NotificationItem) => (
    <View key={item.id} style={styles.notificationCard}>
      <View style={styles.iconWrapper}>
        {typeof item.icon === 'string' ? (
          <Text style={styles.iconText}>{item.icon}</Text>
        ) : (
          item.icon
        )}
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationDescription}>{item.description}</Text>
      </View>
      <Text style={styles.timeText}>{item.time}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#543A26" />

      <View style={styles.header}>
      <TouchableOpacity style={styles.backButton}>
          <Ionicons name="chevron-back" size={moderateScale(24)} color="#fff"  onPress={() => router.back()}/>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Notification</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView
        style={styles.scrollView}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today</Text>
          <TouchableOpacity>
            <Text style={styles.markAllRead}>Mark all read</Text>
          </TouchableOpacity>
        </View>
        {todayNotifications.map(renderNotificationItem)}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Yesterday</Text>
          <TouchableOpacity>
            <Text style={styles.markAllRead}>Mark all read</Text>
          </TouchableOpacity>
        </View>
        {yesterdayNotifications.map(renderNotificationItem)}

        <View style={styles.bottomSpacing} />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF',
  },
  header: {
    backgroundColor: '#543A26',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: scale(16),
    height: verticalScale(120),
    borderBottomLeftRadius: scale(20),
    borderBottomRightRadius: scale(20),
  },
  backButton: {
    width: scale(40),
    justifyContent: 'center',
  },
  backIcon: {
    color: '#FFFFFF',
    fontSize: moderateScale(24),
  },
  headerTitle: {
    color: '#FFFFFF',
    fontSize: moderateScale(22),
    fontWeight: '700',
  },
  placeholder: {
    width: scale(40),
  },
  scrollView: {
    paddingHorizontal: scale(16),
    marginTop: verticalScale(10),
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: verticalScale(20),
    marginBottom: verticalScale(10),
  },
  sectionTitle: {
    fontSize: moderateScale(18),
    fontWeight: '700',
    color: '#9E9E9E',
  },
  markAllRead: {
    fontSize: moderateScale(13),
    color: '#6E6E6E',
    fontWeight: '600',
  },
  notificationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: scale(14),
    padding: scale(12),
    marginBottom: verticalScale(12),
  },
  iconWrapper: {
    width: scale(56),
    height: scale(56),
    borderRadius: scale(28),
    backgroundColor: '#C9A978',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: scale(14),
  },
  iconText: {
    fontSize: moderateScale(26),
  },
  textContainer: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: moderateScale(18),
    fontWeight: '600',
    fontFamily:"Inter",
    color: "rgba(0, 0, 0, 1)",
  },
  notificationDescription: {
    fontSize: moderateScale(13),
    fontWeight: '600',
    fontFamily:"Inter",
    color: "rgba(0, 0, 0, 1)",
    marginTop: verticalScale(2),
  },
  timeText: {
    fontSize: moderateScale(12),
    color: '#B8B8B8',
    fontWeight: '400',
    marginLeft: scale(6),
  },
  bottomSpacing: {
    height: verticalScale(80),
  },
});

export default NotificationScreen;
