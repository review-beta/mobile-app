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

interface Dining {
  id: number;
  name: string;
  location: string;
  banner_image: string;
  is_featured: true;
}

export default function DiningContent() {
  const [dinings, setDinings] = useState<Dining[]>([]);

  useEffect(() => {
    const fetchDinings = async () => {
      try {
        const res = await API.get("/dining/");
        const featuredDinings = res.data.filter((dining: Dining) => dining.is_featured);
        setDinings(res.data);
      } catch (err: any) {
  console.log("Error fetching dinings:", err.response?.data || err.message);
      }
    };

    fetchDinings();
  }, []);

  const renderDining = ({ item }: { item: Dining }) => (
    <Pressable style={sharedStyles.card}>
      <Image
        source={{ uri: item.banner_image }}
        style={sharedStyles.cardImage}
        resizeMode="cover"
      />
      <View style={sharedStyles.cardContent}>
        <Text style={sharedStyles.cardTitle}>{item.name}</Text>
        <Text style={sharedStyles.cardSubtitle}>{item.location}</Text>
      </View>
    </Pressable>
  );

    const renderAllDining = ({ item }: { item: Dining }) => (
    <Pressable style={sharedStyles.cardGrid}>
      <Image
        source={{ uri: item.banner_image }}
        style={sharedStyles.cardGridImage}
        resizeMode="cover"
      />
      <View style={sharedStyles.cardContent}>
        <Text style={sharedStyles.cardTitle}>{item.name}</Text>
        <Text style={sharedStyles.cardSubtitle}>{item.location}</Text>
      </View>
    </Pressable>
  );

  return (
    <ScrollView style={sharedStyles.container}>
      {/* Hero Section */}
      <View style={sharedStyles.heroSection}>
        <Text style={sharedStyles.heroText}>
          Dine at the finest restaurants in 
          <CustomDropdown />
        </Text>
        <Text style={sharedStyles.subText}>
          Exclusive experiences and reviews, curated for your enjoyment.
        </Text>
      </View>

      {/* Dynamic Movie List */}
      <View style={sharedStyles.trendingSection}>
        <Text style={sharedStyles.sectionTitle}>Latest Dinings</Text>
        <FlatList
          data={dinings}
          renderItem={renderDining}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View style={sharedStyles.trendingSection}>
        <Text style={sharedStyles.sectionTitle}>All Dinings</Text>
        <FlatList
          data={dinings}
          renderItem={renderAllDining}
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