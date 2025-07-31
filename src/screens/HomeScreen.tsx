import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ScrollView,
} from 'react-native';
import { useRef, useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import LogoHeader from '../components/LogoHeader';
import Header from '../components/Header';
import ForYouContent from './ForYouContent';
import MoviesContent from './MoviesContent';
import DiningContent from './DiningContent';
import EventsContent from './EventsContent';
import HangoutsContent from './HangoutsScreen';
import BusinessesContent from './BusinessesScreen';

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState('for-you');
  const scrollY = useRef(new Animated.Value(0)).current;

  const navItems = [
    { label: 'For You', key: 'for-you' },
    { label: 'Movies', key: 'movies' },
    { label: 'Dining', key: 'dining' },
    { label: 'Events', key: 'events' },
    { label: 'Businesses', key: 'businesses' },
    { label: 'Hangouts', key: 'hangouts' },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'for-you':
        return <ForYouContent />;
      case 'movies':
        return <MoviesContent />;
      case 'dining':
        return <DiningContent />;
      case 'events':
        return <EventsContent />;
      case 'hangouts':
        return <HangoutsContent />;
      case 'businesses':
        return <BusinessesContent />;
      default:
        return <Text>No content</Text>;
    }
  };

  const HEADER_HEIGHT = 55; // Adjust based on your Header component height

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const stickyHeaderOpacity = scrollY.interpolate({
    inputRange: [55, HEADER_HEIGHT - 0],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: '#fff' }}>
      <Animated.View
        style={[
          styles.stickyHeader,
          {
            transform: [{ translateY: headerTranslateY }],
            opacity: stickyHeaderOpacity,
          },
        ]}
      >
        <Header />        
        {/* Horizontal Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ paddingHorizontal: 16, paddingTop: 8, paddingBottom: 16 }}
        >
          {navItems.map((item) => (
            <TouchableOpacity
              key={item.key}
              onPress={() => setActiveTab(item.key)}
              style={[
                styles.tabButton,
                activeTab === item.key && styles.tabButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === item.key && styles.tabTextActive,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View>

      <Animated.ScrollView
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
      >
        <LogoHeader />

        {/* This is the same Header but rendered in scroll to take space */}
        <View style={{ height: HEADER_HEIGHT }}>
          <Header />
        </View>

        {/* Horizontal Tabs */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={{ paddingHorizontal: 16, paddingVertical: 5 }}
        >
          {navItems.map((item) => (
            <TouchableOpacity
              key={item.key}
              onPress={() => setActiveTab(item.key)}
              style={[
                styles.tabButton,
                activeTab === item.key && styles.tabButtonActive,
              ]}
            >
              <Text
                style={[
                  styles.tabText,
                  activeTab === item.key && styles.tabTextActive,
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Content */}
        <View style={{ paddingHorizontal: 8 }}>{renderContent()}</View>
      </Animated.ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  stickyHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: '#fff',
  },
  tabButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
    backgroundColor: '#eee',
  },
  tabButtonActive: {
    backgroundColor: '#eeeaff',
  },
  tabText: {
    fontSize: 14,
    fontFamily: 'Futura-Bold',
    color: '#444',
  },
  tabTextActive: {
    color: '#5A3EFF',
  },
});
