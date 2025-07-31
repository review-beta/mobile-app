import React from 'react';
import { View, Text, Button } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';

const ProfileScreen = () => {
  const { user, logout } = useAuth();

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 20 }}>Hello, {user?.name || 'User'}</Text>
      <Button title="Logout" onPress={logout} />
    </View>
  );
};

export default ProfileScreen;