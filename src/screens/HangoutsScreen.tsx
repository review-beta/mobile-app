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

interface Hangout {
  id: number;
  name: string;
  type: string;
  banner_image: string;
  is_featured: true;
}

export default function HangoutsContent() {
  const [hangouts, setHangouts] = useState<Hangout[]>([]);

  useEffect(() => {
    const fetchHangouts = async () => {
      try {
        const res = await API.get("/hangout-spots/");
        const featuredHangouts = res.data.filter((hangout: Hangout) => hangout.is_featured);
        setHangouts(res.data);
      } catch (err: any) {
  console.log("Error fetching hangout spots:", err.response?.data || err.message);
      }
    };

    fetchHangouts();
  }, []);

  const renderHangouts = ({ item }: { item: Hangout }) => (
    <Pressable style={sharedStyles.card}>
      <Image
        source={{ uri: item.banner_image }}
        style={sharedStyles.cardImage}
        resizeMode="cover"
      />
      <View style={sharedStyles.cardContent}>
        <Text style={sharedStyles.cardTitle}>{item.name}</Text>
        <Text style={sharedStyles.cardSubtitle}>{item.type}</Text>
      </View>
    </Pressable>
  );

    const renderAllHangouts = ({ item }: { item: Hangout }) => (
    <Pressable style={sharedStyles.cardGrid}>
      <Image
        source={{ uri: item.banner_image }}
        style={sharedStyles.cardGridImage}
        resizeMode="cover"
      />
      <View style={sharedStyles.cardContent}>
        <Text style={sharedStyles.cardTitle}>{item.name}</Text>
        <Text style={sharedStyles.cardSubtitle}>{item.type}</Text>
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
        <Text style={sharedStyles.sectionTitle}>Latest Hangout Spots</Text>
        <FlatList
          data={hangouts}
          renderItem={renderHangouts}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View style={sharedStyles.trendingSection}>
        <Text style={sharedStyles.sectionTitle}>All Hangout Spots</Text>
        <FlatList
          data={hangouts}
          renderItem={renderAllHangouts}
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