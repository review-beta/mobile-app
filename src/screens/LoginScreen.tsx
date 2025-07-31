import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../contexts/AuthContext";
import API from "../api/client";
import { Ionicons } from "@expo/vector-icons";
import Loader from "../components/Loader";

export default function LoginScreen() {
  const navigation = useNavigation();
  const { login } = useAuth();
  const [formData, setFormData] = useState({
    identifier: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (name: string, value: string) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true)
    try {
      const res = await API.post("login/", formData);
      const { access, refresh } = res.data;

      // Fetch user profile
      const userRes = await API.get("profile/", {
        headers: {
          Authorization: `Bearer ${access}`,
        },
      });
      const { name, email, username } = userRes.data;


      const user = {
        access,
        refresh,
        name,
        email,
        username,
      };

          login(
      {
        access,
        refresh,
        name: user.name,
        email: user.email,
        username: user.username,
      },
    );

      navigation.navigate("Account" as never);
    } catch (err) {
      setError("Invalid username/email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Loader visible={loading} />
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.navigate("Account")}>
          <Ionicons name="chevron-back" size={28} color="black" />
        </TouchableOpacity>
        <Image
          source={require("../../assets/reviewbeta-logoo.png")}
          style={styles.headerLogo}
          resizeMode="contain"
        />
        {/* Space filler to balance layout */}
        <View style={{ width: 28 }} /> 
      </View>

      {/* Form */}
      <View style={styles.form}>
        <Text style={styles.title}>Log in to your account</Text>

        <TextInput
          style={styles.input}
          placeholder="Username or Email"
          value={formData.identifier}
          onChangeText={(value) =>
            handleChange("identifier", value.toLowerCase())
          }
          autoCapitalize="none"
        />

        <TextInput
          style={styles.input}
          placeholder="Password"
          value={formData.password}
          onChangeText={(value) => handleChange("password", value)}
          secureTextEntry
        />

        {error ? <Text style={styles.error}>{error}</Text> : null}

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Log in</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("ResetRequestScreen" as never)}
        >
          <Text style={styles.link}>Forgot your password?</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate("Register" as never)}
        >
          <Text style={styles.signupLink}>New to ReviewBeta? Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

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
