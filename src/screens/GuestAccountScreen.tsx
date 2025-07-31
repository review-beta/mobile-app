import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const GuestAccountScreen = () => {
  const navigation = useNavigation();

  return (
    <View style={{ padding: 20 }}>
      <Text style={{ fontSize: 22, marginBottom: 20 }}>Welcome</Text>
      <Button title="Login" onPress={() => navigation.navigate('Login')} />
      <View style={{ height: 10 }} />
      <Button title="Create Account" onPress={() => navigation.navigate('Register')} />
    </View>
  );
};

export default GuestAccountScreen;