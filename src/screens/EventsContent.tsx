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

interface Event {
  id: number;
  title: string;
  location: string;
  banner_image: string;
  is_featured: true;
}

export default function EventsContent() {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await API.get("/events/");
        const featuredEvents = res.data.filter((event: Event) => event.is_featured);
        setEvents(res.data);
      } catch (err: any) {
  console.log("Error fetching events:", err.response?.data || err.message);
      }
    };

    fetchEvents();
  }, []);

  const renderMovie = ({ item }: { item: Event }) => (
    <Pressable style={sharedStyles.card}>
      <Image
        source={{ uri: item.banner_image }}
        style={sharedStyles.cardImage}
        resizeMode="cover"
      />
      <View style={sharedStyles.cardContent}>
        <Text style={sharedStyles.cardTitle}>{item.title}</Text>
        <Text style={sharedStyles.cardSubtitle}>{item.location}</Text>
      </View>
    </Pressable>
  );

    const renderAllMovie = ({ item }: { item: Event }) => (
    <Pressable style={sharedStyles.cardGrid}>
      <Image
        source={{ uri: item.banner_image }}
        style={sharedStyles.cardGridImage}
        resizeMode="cover"
      />
      <View style={sharedStyles.cardContent}>
        <Text style={sharedStyles.cardTitle}>{item.title}</Text>
        <Text style={sharedStyles.cardSubtitle}>{item.location}</Text>
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
        <Text style={sharedStyles.sectionTitle}>Latest Events</Text>
        <FlatList
          data={events}
          renderItem={renderMovie}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View style={sharedStyles.trendingSection}>
        <Text style={sharedStyles.sectionTitle}>All Events</Text>
        <FlatList
          data={events}
          renderItem={renderAllMovie}
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