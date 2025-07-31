import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import Loader from "../../components/Loader";
import { capitalize } from '../../../utils/helpers';

type RootStackParamList = {
  ResetRequestScreen: undefined;
  VerifyCodeScreen: { identifier: string };
  NewPasswordScreen: { identifier: string };
  Login: undefined;
};

type Props = NativeStackScreenProps<RootStackParamList, 'ResetRequestScreen'>;

export default function ResetRequestScreen({ navigation }: Props) {
  const [identifier, setIdentifier] = useState('');
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

const isValidEmail = (email: string) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

const handleSendCode = async () => {
  if (!identifier) {
    setError('Please enter your email address');
    return;
  }

  if (!isValidEmail(identifier)) {
    setError("Please enter a valid email address");
    return; // Stop further execution
  }

  setLoading(true);

  try {
    await fakeSendResetCode(identifier); // Simulated API call
    navigation.navigate('VerifyCodeScreen', { identifier });
  } catch (err) {
    setError("Failed to send code");
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
      <Text style={styles.title}>Reset Your Password</Text>
      <TextInput
        placeholder="Email"
        value={identifier}
        keyboardType="email-address"
        onChangeText={(text) => {
            setIdentifier(text);
            if (isValidEmail(text)) setError('');
        }}
        onFocus={() => setError('')}
        style={styles.input}
        />
      
      {error ? <Text style={styles.error}>{error}</Text> : null}

      <TouchableOpacity style={styles.button} onPress={handleSendCode}>
        <Text style={styles.buttonText}>Send Code</Text>
      </TouchableOpacity>
    </View>
  );
}

const fakeSendResetCode = async (identifier: string) => {
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