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
import ShimmerSkeleton from "../components/ShimmerSkeleton";
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';

type RootStackParamList = {
  MovieDetail: { id: number }; // or { movie: Movie } if you want to pass the whole object
};

type NavigationProp = StackNavigationProp<RootStackParamList, 'MovieDetail'>;


interface Person {
  id: number;
  name: string;
}

interface Movie {
  id: number;
  title: string;
  description: string;
  poster_thumbnail: string;
  is_featured: true;
  cast: Person[]; // ✅ array of objects with name
  directors: Person[];
  genre: string;
}

interface Dining {
  id: number;
  name: string;
  location: string;
  banner_image: string;
  is_featured: true;
}

interface Event {
  id: number;
  title: string;
  location: string;
  banner_image: string;
  is_featured: true;
}

interface Business {
  id: number;
  name: string;
  business_type: string;
  banner_image: string;
  is_featured: true;
}

interface Hangout {
  id: number;
  name: string;
  type: string;
  banner_image: string;
  is_featured: true;
}

export default function ForYouContent() {
  const navigation = useNavigation<NavigationProp>();

  const [movies, setMovies] = useState<Movie[]>([]);
  const [dinings, setDinings] = useState<Dining[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [hangouts, setHangouts] = useState<Hangout[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await API.get("/movies/");
        const featuredMovies = res.data.filter((movie: Movie) => movie.is_featured);
        setMovies(res.data);
      } catch (err: any) {
  console.log("Error fetching movies:", err.response?.data || err.message);
      } finally {
      setTimeout(() => {
        setLoading(false); // Delay loading state change by seconds
      }, 1000);
      }
    };

    fetchMovies();

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

  const renderMovie = ({ item }: { item: Movie }) => (
    <Pressable style={sharedStyles.card} onPress={() => navigation.navigate('MovieDetailScreen', { id: item.id })}>
      <Image
        source={{ uri: item.poster_thumbnail }}
        style={sharedStyles.cardImage}
        resizeMode="cover"
      />
      <View style={sharedStyles.cardContent}>
        <Text style={sharedStyles.cardTitle}>{item.title}</Text>
        <Text style={sharedStyles.cardSubtitle}>
            {item.cast.map((person: { name: string }) => person.name).join(", ")}
        </Text>
      </View>
    </Pressable>
  );

    const renderDining = ({ item }: { item: Dining }) => (
    <Pressable style={sharedStyles.card}>
      <Image
        source={{ uri: item.banner_image }}
        style={sharedStyles.cardImage}
        resizeMode="cover"
      />
      <View style={sharedStyles.cardContent}>
        <Text style={sharedStyles.cardTitle}>{item.name}</Text>
        <Text style={sharedStyles.cardSubtitle}>
            {item.location}
        </Text>
      </View>
    </Pressable>
  );

    const renderEvent = ({ item }: { item: Event }) => (
    <Pressable style={sharedStyles.card}>
      <Image
        source={{ uri: item.banner_image }}
        style={sharedStyles.cardImage}
        resizeMode="cover"
      />
      <View style={sharedStyles.cardContent}>
        <Text style={sharedStyles.cardTitle}>{item.title}</Text>
        <Text style={sharedStyles.cardSubtitle}>
            {item.location}
        </Text>
      </View>
    </Pressable>
  );

    const renderBusiness = ({ item }: { item: Business }) => (
    <Pressable style={sharedStyles.card}>
      <Image
        source={{ uri: item.banner_image }}
        style={sharedStyles.cardImage}
        resizeMode="cover"
      />
      <View style={sharedStyles.cardContent}>
        <Text style={sharedStyles.cardTitle}>{item.name}</Text>
        <Text style={sharedStyles.cardSubtitle}>
            {item.business_type}
        </Text>
      </View>
    </Pressable>
  );

    const renderHangouts = ({ item }: { item: Hangout }) => (
    <Pressable style={sharedStyles.card}>
      <Image
        source={{ uri: item.banner_image }}
        style={sharedStyles.cardImage}
        resizeMode="cover"
      />
      <View style={sharedStyles.cardContent}>
        <Text style={sharedStyles.cardTitle}>{item.name}</Text>
        <Text style={sharedStyles.cardSubtitle}>
            {item.type}
        </Text>
      </View>
    </Pressable>
  );

    const renderSkeletons = () => (
    <FlatList
      data={[1, 2, 3, 4]}
      keyExtractor={(item) => item.toString()}
      horizontal
      showsHorizontalScrollIndicator={false}
      renderItem={() => (
        <ShimmerSkeleton
          width={220}
          height={330}
          borderRadius={12}
          style={{ marginRight: 16 }}
        />
      )}
    />
  );

  return (
    <ScrollView style={sharedStyles.container}>
      {/* Hero Section */}
      <View style={sharedStyles.heroSection}>
        <Text style={sharedStyles.heroText}>
          Discover the best of the best in
          <CustomDropdown />
        </Text>
        <Text style={sharedStyles.subText}>
          Exclusive experiences and reviews, curated for your enjoyment.
        </Text>
      </View>

      {/* Dynamic Movie List */}
      <View style={sharedStyles.trendingSection}>
        <Text style={sharedStyles.sectionTitle}>Latest Movie Picks</Text>
        {loading ? (
          renderSkeletons()
        ) : (
        <FlatList
          data={movies}
          renderItem={renderMovie}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        )}
      </View>

      <View style={sharedStyles.trendingSection}>
        <Text style={sharedStyles.sectionTitle}>Latest Dinings</Text>
        {loading ? (
          renderSkeletons()
        ) : (
        <FlatList
          data={dinings}
          renderItem={renderDining}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        )}
      </View>

      <View style={sharedStyles.trendingSection}>
        <Text style={sharedStyles.sectionTitle}>Latest Events</Text>
        {loading ? (
          renderSkeletons()
        ) : (
        <FlatList
          data={events}
          renderItem={renderEvent}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        )}
      </View>

      <View style={sharedStyles.trendingSection}>
        <Text style={sharedStyles.sectionTitle}>Latest Businesses</Text>
        {loading ? (
          renderSkeletons()
        ) : (
        <FlatList
          data={businesses}
          renderItem={renderBusiness}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        )}
      </View>

      <View style={sharedStyles.trendingSection}>
        <Text style={sharedStyles.sectionTitle}>Latest Hangout Spots</Text>
        {loading ? (
          renderSkeletons()
        ) : (
        <FlatList
          data={hangouts}
          renderItem={renderHangouts}
          keyExtractor={(item) => item.id.toString()}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
        )}
      </View>
    </ScrollView>
  );
}
