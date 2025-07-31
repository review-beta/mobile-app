import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useNavigation } from "@react-navigation/native";
import CountryFlag from "react-native-country-flag";

const Logo = require("../../assets/reviewbeta-logoo.png");

export default function LogoHeader() {
  const navigation = useNavigation();

    return (
    <View
        style={{
        backgroundColor: "#fff",
        paddingTop: 12,
        paddingBottom: 4,
        paddingHorizontal: 16,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between", // Ensures logo on left, location on right
        borderBottomWidth: 1,
        borderBottomColor: "#fff",
        width: "100%",
        }}
    >
        {/* Logo */}
        <TouchableOpacity onPress={() => navigation.navigate("Home" as never)}>
        <Image
            source={Logo}
            style={{ width: 120, height: 40, resizeMode: "contain" }}
        />
        </TouchableOpacity>

        {/* Location */}
        {/* <View style={{ flexDirection: "row", alignItems: "center" }}>
        <MaterialIcons name="location-pin" size={20} color="#4B5563" />
        <Text style={{ color: "#374151", fontSize: 16, fontWeight: "500" }}>
            Nigeria
        </Text>
        </View> */}
        
        <View style={styles.locationContainer}>
            <MaterialIcons name="location-pin" size={20} color="#4B5563" />
            <Text style={styles.locationText}>NG</Text>
            <CountryFlag isoCode="NG" size={14} />
        </View>
    </View>
    );
}

const styles = StyleSheet.create({
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  locationText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginHorizontal: 4,
  },
  flagIcon: {
    width: 20,
    height: 14,
    resizeMode: 'cover',
    borderRadius: 2,
  },
});