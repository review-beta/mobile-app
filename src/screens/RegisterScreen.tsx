import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  Image,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import API from "../api/client";
import { useAuth } from "../../contexts/AuthContext";
import { Ionicons } from "@expo/vector-icons";
import DropDownPicker from 'react-native-dropdown-picker';
import Loader from "../components/Loader";
import { capitalize } from "../../utils/helpers";

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [genderOpen, setGenderOpen] = useState(false);
  const [genderValue, setGenderValue] = useState(null);
  const [genderItems, setGenderItems] = useState([
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'female' },
  ]);

  const [locationOpen, setLocationOpen] = useState(false);
    const [locationValue, setLocationValue] = useState(null);
    const [locationItems, setLocationItems] = useState([
    { label: 'Nigeria', value: 'nigeria' },
    { label: 'Ghana', value: 'ghana' },
    ]);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirm_password: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    gender: "",
    location: "",
  });

  const handleChange = (name: string, value: string) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleNext = () => {
    const { username, email, password, confirm_password } = formData;
    if (!username || !email || !password || !confirm_password) {
      setError("Please fill all fields before proceeding.");
      return;
    }
    if (password !== confirm_password) {
      setError("Passwords do not match.");
      return;
    }

    setError("");
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = async () => {
    setLoading(true)
    setError("");
    try {
      await API.post("register/", formData);
      Alert.alert("Success", "Registration successful! Please log in.");
      navigation.navigate("Login" as never);
    } catch (err: any) {
        if (err.response?.data) {
            const errorData = err.response.data;

            if (typeof errorData === "string") {
            setError(errorData); // plain string error
            } else if (typeof errorData === "object") {
            const messages = Object.entries(errorData)
                .map(([field, errors]) => {
                const readableField = field.replace(/_/g, " ");
                return `${readableField}: ${Array.isArray(errors) ? errors.join(", ") : errors}`;
                })
                .join("\n");
            setError(messages); // nicely formatted multiline error
            }
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
        setLoading(false); // ✅ Stop the loader regardless of outcome
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
          source={require("../../assets/reviewbeta-logoo.png")}
          style={styles.headerLogo}
          resizeMode="contain"
        />
        {/* Space filler to balance layout */}
        <View style={{ width: 28 }} /> 
      </View>

      {/* Form */}
        <ScrollView 
        style={styles.form} 
        keyboardShouldPersistTaps="handled" 
        showsVerticalScrollIndicator={false}
        >
            <Text style={styles.title}>Create your account</Text>

            {step === 1 && (
                <>
                <TextInput
                    placeholder="Username"
                    style={styles.input}
                    autoCapitalize="none"
                    value={formData.username}
                    onChangeText={(text) => handleChange("username", text.toLowerCase())}
                />
                <TextInput
                    placeholder="Email"
                    style={styles.input}
                    keyboardType="email-address"
                    value={formData.email}
                    onChangeText={(text) => handleChange("email", text.toLowerCase())}
                />
                <TextInput
                    placeholder="Password"
                    style={styles.input}
                    secureTextEntry
                    value={formData.password}
                    onChangeText={(text) => handleChange("password", text)}
                />
                <TextInput
                    placeholder="Confirm Password"
                    style={styles.input}
                    secureTextEntry
                    value={formData.confirm_password}
                    onChangeText={(text) => handleChange("confirm_password", text)}
                />

                {error ? <Text style={styles.error}>{error}</Text> : null}

                <TouchableOpacity style={styles.button} onPress={handleNext}>
                    <Text style={styles.buttonText}>Continue</Text>
                </TouchableOpacity>
                </>
            )}

            {step === 2 && (
                <>
                <View style={styles.row}>
                    <TextInput
                    placeholder="First Name"
                    style={[styles.input, styles.halfInput]}
                    value={formData.first_name}
                    onChangeText={(text) => handleChange("first_name", text)}
                    onBlur={() =>
                    handleChange("first_name", capitalize(formData.first_name))
                    }
                    />
                    <TextInput
                    placeholder="Last Name"
                    style={[styles.input, styles.halfInput]}
                    value={formData.last_name}
                    onChangeText={(text) => handleChange("last_name", text)}
                    onBlur={() =>
                    handleChange("last_name", capitalize(formData.last_name))
                    }
                    />
                </View>
                <TextInput
                    placeholder="Phone Number"
                    style={styles.input}
                    keyboardType="phone-pad"
                    value={formData.phone_number}
                    onChangeText={(text) => handleChange("phone_number", text)}
                />
                <View style={{ zIndex: 2000, marginBottom: 16 }}>
                <DropDownPicker
                    open={genderOpen}
                    value={genderValue}
                    items={genderItems}
                    setOpen={setGenderOpen}
                    setValue={(callback) => {
                    const value = callback(genderValue);
                    setGenderValue(value);
                    handleChange('gender', value);
                    }}
                    listMode="SCROLLVIEW"
                    textStyle={{ fontFamily: 'Worksans-Medium', color: '#444' }}
                    placeholderStyle={{ fontFamily: 'Worksans-Regular', color: '#444' }}
                    setItems={setGenderItems}
                    placeholder="Select Gender"
                    style={{
                        height: 56,
                        borderColor: "#f2efff",
                        borderWidth: 1,
                        paddingHorizontal: 16,
                        borderRadius: 4,
                        backgroundColor: "#f2efff30",
                    }}
                    dropDownContainerStyle={{
                        borderColor: '#f2efff',
                        backgroundColor: "#f2efff",
                    }}
                />
                </View>

                <View style={{ zIndex: 1000, marginBottom: 16 }}>
                <DropDownPicker
                    open={locationOpen}
                    value={locationValue}
                    items={locationItems}
                    setOpen={setLocationOpen}
                    setValue={(callback) => {
                    const value = callback(locationValue);
                    setLocationValue(value);
                    handleChange('location', value);
                    }}
                    setItems={setLocationItems}
                    listMode="SCROLLVIEW"
                    textStyle={{ fontFamily: 'Worksans-Medium', color: '#444' }}
                    placeholderStyle={{ fontFamily: 'Worksans-Regular', color: '#444' }}
                    placeholder="Select Location"
                    style={{
                        height: 56,
                        borderColor: "#f2efff",
                        borderWidth: 1,
                        paddingHorizontal: 16,
                        borderRadius: 4,
                        backgroundColor: "#f2efff30",
                    }}
                    dropDownContainerStyle={{
                        borderColor: '#f2efff',
                        backgroundColor: "#f2efff",
                    }}
                />
                </View>

                {error ? <Text style={styles.error}>{error}</Text> : null}

                <View style={styles.row}>
                    <TouchableOpacity style={styles.secondaryButton} onPress={handleBack}>
                    <Text style={styles.secondaryButtonText}>Back</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.primaryButton} onPress={handleSubmit}>
                    <Text style={styles.buttonText}>Register</Text>
                    </TouchableOpacity>
                </View>
                </>
            )}

            <TouchableOpacity
            onPress={() => navigation.navigate("Login" as never)}
            >
            <Text style={styles.signupLink}>Already have an account? Login</Text>
            </TouchableOpacity>
        </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },
  halfInput: {
    flex: 1,
  },
  row: {
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between",
  },
  secondaryButton: {
    backgroundColor: "#eee",
    padding: 16,
    borderRadius: 6,
    marginTop: 6,
    alignItems: "center",
    flex: 1,
  },
  secondaryButtonText: {
    color: "#333",
    fontFamily: "Futura-Bold",
  },
  errorText: {
    color: "red",
    marginTop: 12,
    textAlign: "center",
  },
  linkText: {
    marginTop: 20,
    color: "#4F46E5",
    textAlign: "center",
    fontWeight: "600",
  },
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
  primaryButton: {
    backgroundColor: "#5A3EFF",
    padding: 16,
    borderRadius: 6,
    marginTop: 6,
    alignItems: "center",
    flex: 1,
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
    marginTop: 8,
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
