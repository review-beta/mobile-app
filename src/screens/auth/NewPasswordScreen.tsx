// screens/ResetPasswordScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Loader from "../../components/Loader";
import { Ionicons } from '@expo/vector-icons';


type RootStackParamList = {
  NewPasswordScreen: { identifier: string };
  Login: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'NewPasswordScreen'>;

export default function NewPasswordScreen({ navigation }: Props) {
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleReset = async () => {
    if (password.length < 8) return setError('Password too short');
    if (password !== confirm) return setError("Passwords don't match");

    setLoading(true);

    try {
      await fakeResetPassword(password);
      setError('Password reset successful');
      navigation.navigate('Login');
    } catch (err) {
      setError('Failed to reset password');
    } finally {
    setLoading(false);
  }
  };

  return (
    <View style={styles.container}>
      <Loader visible={loading} />
        {/* Header */}
        <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Ionicons name="chevron-back" size={28} color="black" />
            </TouchableOpacity>
            <Image
            source={require("../../../assets/reviewbeta-logoo.png")}
            style={styles.headerLogo}
            resizeMode="contain"
            />
            {/* Space filler to balance layout */}
            <View style={{ width: 28 }} /> 
        </View>
      <Text style={styles.title}>Set New Password</Text>
      <TextInput
        placeholder="New Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      <TextInput
        placeholder="Confirm Password"
        value={confirm}
        onChangeText={setConfirm}
        secureTextEntry
        style={styles.input}
      />
            
        {error ? <Text style={styles.error}>{error}</Text> : null}
    
        <TouchableOpacity style={styles.button} onPress={handleReset}>
            <Text style={styles.buttonText}>Reset Password</Text>
        </TouchableOpacity>
    </View>
  );
}

const fakeResetPassword = async (password: string) => {
  return new Promise((res) => setTimeout(res, 1000));
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 30,
  },
  headerLogo: {
    width: 120,
    height: 40,
  },
  logo: {
    width: 160,
    height: 40,
    resizeMode: "contain",
    marginBottom: 24,
  },
  button: {
    backgroundColor: "#5A3EFF",
    padding: 16,
    borderRadius: 6,
    marginTop: 6,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 15,
    fontFamily: "Futura-Bold",
  },
  error: {
    color: "red",
    marginBottom: 8,
    fontSize: 14,
    fontFamily: "Worksans-Regular",
    textAlign: "center",
  },
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  form: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    marginBottom: 20,
    fontWeight: "600",
    textAlign: "center",
    fontFamily: "Worksans-Medium",
  },
  input: {
    height: 56,
    borderColor: "#f2efff",
    borderWidth: 1,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginBottom: 15,
    fontFamily: "Worksans-Medium",
    backgroundColor: "#f2efff30",
  },
  link: {
    color: "#5A3EFF",
    textAlign: "center",
    marginTop: 24,
    fontFamily: "Worksans-Medium",
    fontSize: 15,
  },
  signupLink: {
    color: "#5A3EFF",
    textAlign: "center",
    marginTop: 20,
    fontWeight: "500",
    fontFamily: "Worksans-Medium",
    fontSize: 15,
  },
});
