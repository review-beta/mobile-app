import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  FlatList,
} from "react-native";
import CustomDropdown from "../components/CustomDropdown";
import API from "../api/client";
import sharedStyles from "../styles/sharedStyles";

interface Business {
  id: number;
  name: string;
  business_type: string;
  banner_image: string;
  is_featured: true;
}

export default function BusinessesContent() {
  const [businesses, setBusinesses] = useState<Business[]>([]);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const res = await API.get("/businesses/");
        const featuredBusinesses = res.data.filter((business: Business) => business.is_featured);
        setBusinesses(res.data);
      } catch (err: any) {
  console.log("Error fetching businesses:", err.response?.data || err.message);
      }
    };

    fetchBusinesses();
  }, []);

  const renderBusiness = ({ item }: { item: Business }) => (
    <Pressable style={sharedStyles.card}>
      <Image
        source={{ uri: item.banner_image }}
        style={sharedStyles.cardImage}
        resizeMode="cover"
      />
      <View style={sharedStyles.cardContent}>
        <Text style={sharedStyles.cardTitle}>{item.name}</Text>
        <Text style={sharedStyles.cardSubtitle}>{item.business_type}</Text>
      </View>
    </Pressable>
  );

    const renderAllBusiness = ({ item }: { item: Business }) => (
    <Pressable style={sharedStyles.cardGrid}>
      <Image
        source={{ uri: item.banner_image }}
        style={sharedStyles.cardGridImage}
        resizeMode="cover"
      />
      <View style={sharedStyles.cardContent}>
        <Text style={sharedStyles.cardTitle}>{item.name}</Text>
        <Text style={sharedStyles.cardSubtitle}>{item.business_type}</Text>
      </View>
    </Pressable>
  );

  return (
    <ScrollView style={sharedStyles.container}>
      {/* Hero Section */}
      <View style={sharedStyles.heroSection}>
        <Text style={sharedStyles.heroText}>
          Watch what's best on screen in 
          <CustomDropdown />
        </Text>
        <Text style={sharedStyles.subText}>
          Exclusive experiences and reviews, curated for your enjoyment.
        </Text>
      </View>

      {/* Dynamic Movie List */}
      <View style={sharedStyles.trendingSection}>
        <Text style={sharedStyles.sectionTitle}>Latest Businesses</Text>
        <FlatList
          data={businesses}
          renderItem={renderBusiness}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View style={sharedStyles.trendingSection}>
        <Text style={sharedStyles.sectionTitle}>All Businesses</Text>
        <FlatList
          data={businesses}
          renderItem={renderAllBusiness}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2} // ➜ 3 items per row
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={sharedStyles.gridContainer}
        />
      </View>

    </ScrollView>
  );
}