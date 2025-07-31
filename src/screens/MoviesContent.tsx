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

interface Movie {
  id: number;
  title: string;
  description: string;
  poster_thumbnail: string;
  is_featured: true;
}

export default function MoviesContent() {
  const [movies, setMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await API.get("/movies/");
        const featuredMovies = res.data.filter((movie: Movie) => movie.is_featured);
        setMovies(res.data);
      } catch (err: any) {
  console.log("Error fetching movies:", err.response?.data || err.message);
      }
    };

    fetchMovies();
  }, []);

  const renderMovie = ({ item }: { item: Movie }) => (
    <Pressable style={sharedStyles.card}>
      <Image
        source={{ uri: item.poster_thumbnail}}
        style={sharedStyles.cardImage}
        resizeMode="cover"
      />
      <View style={sharedStyles.cardContent}>
        <Text style={sharedStyles.cardTitle}>{item.title}</Text>
        <Text style={sharedStyles.cardSubtitle}>{item.description}</Text>
      </View>
    </Pressable>
  );

    const renderAllMovie = ({ item }: { item: Movie }) => (
    <Pressable style={sharedStyles.cardGrid}>
      <Image
        source={{ uri: item.poster_thumbnail }}
        style={sharedStyles.cardGridImage}
        resizeMode="cover"
      />
      <View style={sharedStyles.cardContent}>
        <Text style={sharedStyles.cardTitle}>{item.title}</Text>
        <Text style={sharedStyles.cardSubtitle}>{item.description}</Text>
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
        <Text style={sharedStyles.sectionTitle}>Latest Movie Picks</Text>
        <FlatList
          data={movies}
          renderItem={renderMovie}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>

      <View style={sharedStyles.trendingSection}>
        <Text style={sharedStyles.sectionTitle}>All Movies</Text>
        <FlatList
          data={movies}
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
