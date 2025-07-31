import React, { useContext, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/AuthContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Loader from '../components/Loader';
import { capitalize } from '../../utils/helpers';

type RootStackParamList = {
  Account: undefined;
  Login: undefined;
  Profile: undefined;
  Settings: undefined;
  Help: undefined;
  Logout: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Account'>;

const AccountScreen: React.FC<Props> = ({ navigation }) => {
  const { user, logout } = useAuth();
  const isLoggedIn = !!user;
  const [loading, setLoading] = useState(false);

  const accountOptions = [
    { label: 'Profile', route: 'Profile' },
    { label: 'Settings', route: 'Settings' },
    { label: 'Help & Feedback', route: 'Help' },
    { label: isLoggedIn ? 'Logout' : 'Login', route: isLoggedIn ? 'Logout' : 'Login' },
  ];

const handleItemPress = async (route: string) => {
  if (route === 'Logout') {
    setLoading(true);
    try {
      await logout();
    } finally {
      setLoading(false);
    }
  } else {
    navigation.navigate(route as keyof RootStackParamList);
  }
};


  console.log('User:', user);

  return (
    <SafeAreaView style={styles.container}>
      <Loader visible={loading} />
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={
            isLoggedIn && user?.profileImage
              ? { uri: user.profileImage }
              : require('../../assets/favicon.png')
          }
          style={styles.avatar}
        />
        <View style={styles.headerTextContainer}>
          <Text style={styles.greeting}>
            {isLoggedIn ? `Hi, ${capitalize(user.username)}` : 'Not signed in'}
          </Text>
          {!isLoggedIn && (
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginText}>Tap to Login</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Options List */}
      <FlatList
        data={accountOptions}
        keyExtractor={(item) => item.label}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.listItem}
            onPress={() => handleItemPress(item.route)}
          >
            <Text style={styles.listText}>{item.label}</Text>
            <Ionicons name="chevron-forward" size={20} color="#999" />
          </TouchableOpacity>
        )}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </SafeAreaView>
  );
};

export default AccountScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 16,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#ddd',
  },
  headerTextContainer: {
    marginLeft: 15,
  },
  greeting: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily: 'Futura-Bold',
  },
  loginText: {
    fontSize: 14,
    color: '#007bff',
    marginTop: 4,
    fontFamily: 'Worksans-Regular'
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#f2f2f2',
  },
  listText: {
    fontSize: 16,
    fontFamily: 'Worksans-Medium'
  },
});