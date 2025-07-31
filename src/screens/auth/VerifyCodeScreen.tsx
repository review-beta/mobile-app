import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, StyleSheet, Alert, TouchableOpacity, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Loader from "../../components/Loader";
import { Ionicons } from '@expo/vector-icons';

type RootStackParamList = {
  VerifyCodeScreen: { identifier: string };
  NewPasswordScreen: { identifier: string };
};

type Props = NativeStackScreenProps<RootStackParamList, 'VerifyCodeScreen'>;

export default function VerifyCodeScreen({ navigation, route }: Props) {
  const { identifier } = route.params;
  const [code, setCode] = useState('');
  const [timer, setTimer] = useState(60);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(countdown);
  }, []);

const handleVerify = async () => {
  if (code.length !== 6) {
    setError('Enter a 6-digit code');
    return;
  }

  setLoading(true);
  setError(null);

  try {
    if (code === '123456') {
      await new Promise(resolve => setTimeout(resolve, 500)); // Just to show the loader briefly
      setLoading(false); // Reset loading before navigating
      navigation.navigate('NewPasswordScreen', { identifier });
    } else {
      setError('Invalid code');
      setLoading(false);
    }
  } catch (err) {
    setError('Something went wrong');
    setLoading(false);
  }
};


  const handleResend = async () => {
    await fakeSendResetCode(identifier);
    setTimer(60);
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
      <Text style={styles.title}>Enter OTP</Text>
      <TextInput
        placeholder="6-digit code"
        value={code}
        onChangeText={setCode}
        keyboardType="numeric"
        maxLength={6}
        style={styles.input}
      />

      {error ? <Text style={styles.error}>{error}</Text> : null}

       <TouchableOpacity style={styles.button} onPress={handleVerify}>
        <Text style={styles.buttonText}>Verify</Text>
      </TouchableOpacity>
      {timer > 0 ? (
        <Text style={styles.timer}>Resend code in {timer}s</Text>
      ) : (
        <TouchableOpacity style={styles.linkButton} onPress={handleResend}>
            <Text style={styles.linkText}>Resend Code</Text>
        </TouchableOpacity>
      )}      
            
    </View>
  );
}

const fakeVerifyCode = async (identifier: string, code: string) => {
  return new Promise((res, rej) =>
    setTimeout(() => (code === '123456' ? res(true) : rej('Invalid')), 1000)
  );
};

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
  linkButton: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 6,
    marginTop: 6,
    alignItems: "center",
  },
  linkText: {
    color: "#5A3EFF",
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
  timer: {
    marginTop: 10,
    color: '#888'
  },
});