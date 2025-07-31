import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, Modal, ScrollView, StyleSheet, SafeAreaView } from "react-native";
import { useNavigation } from '@react-navigation/native';
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

export default function Header() {
  const navigation = useNavigation();

  // Replace with your auth context / hook
  const isAuthenticated = false; 
  const logout = () => {
    // Your logout logic
    console.log("Logout");
    navigation.navigate("Login" as never);
  };

  return (
    
    <SafeAreaView className="bg-white">
        <View className="bg-white border-b border-gray-200 px-3 pb-2 sticky top-0 z-50" 
            style={{
                shadowColor: "#000",
                shadowOffset: { width: 0, height: 1 },
                shadowOpacity: 0.05,
                shadowRadius: 2,
                elevation: 1, // for Android shadow
            }}>
            <View className="flex-row items-center justify-between flex-wrap">

                {/* Search Bar */}
                <View style={styles.searchContainer}>
                    <TextInput
                    placeholder="Search deals, events, movies"
                    placeholderTextColor="#888"
                    style={styles.searchInput}
                    />
                </View>
            </View>
        </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: '#fff',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#fff',
    borderBottomColor: '#E5E7EB',
    borderBottomWidth: 1,
  },
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
  searchContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  searchInput: {
    height: 48,
    borderColor: "#f2efff",
    borderWidth: 1,
    paddingHorizontal: 16,
    borderRadius: 4,
    marginBottom: 4,
    fontFamily: "Worksans-Regular",
    backgroundColor: "#f2efff30",
  },
});
