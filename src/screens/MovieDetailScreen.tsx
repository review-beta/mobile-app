import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, Animated } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import API from '../api/client';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { Share } from 'react-native';
import DetailHeader from '../components/DetailHeader';
import { SafeAreaView } from 'react-native-safe-area-context';
import StarRating from '../components/StarRating';
import { capitalize } from '../../utils/helpers';
import TrailerModal from '../components/TrailerModal';
import WriteReviewButton from '../components/WriteReviewButton';
import { useAuth } from '../../contexts/AuthContext';


type Genre = {
  id: number;
  name: string;
};

type Directors = {
  id: number;
  name: string;
};

type CastMember = {
  id: number;
  name: string;
};

type Movie = {
  review_count: number | undefined;
  average_rating: number;
  id: number;
  title: string;
  description: string;
  poster_full: string;
  genre?: Genre;
  release_date?: string;
  trailer_url: string;
  duration: string;
  language: string;
  country: string;
  directors?: Directors;
  cast?: CastMember;
  movie_type: string;
  age_rating: string;
};

type Review = {
  id: number;
  username: string;
  rating: number;
  review_text: string;
  image?: string | null;
  date_experienced: string;
  created_at: string;
};

type RootStackParamList = {
  MovieDetailScreen: { id: number };
};

type Props = {
  route: RouteProp<RootStackParamList, 'MovieDetailScreen'>;
  navigation: StackNavigationProp<RootStackParamList, 'MovieDetailScreen'>;
};

const MoviesDetailScreen: React.FC<Props> = ({ route }) => {
  const { id } = route.params;
  const [movie, setMovie] = useState<Movie | null>(null);
  const navigation = useNavigation();
  const scrollY = useRef(new Animated.Value(0)).current;
  const { user } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);

useEffect(() => {
  const fetchMovie = async () => {
    try {
      const res = await API.get(`/movies/${id}`);
      setMovie(res.data);
    } catch (error) {
      console.error("Error fetching movie:", error);
    }
  };

  fetchMovie();
}, [id]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await API.get(`/reviews/?object_id=${id}&content_type=movies.Movie`);
        setReviews(res.data);
      } catch (err) {
        console.error('Failed to fetch reviews:', err);
      }
    };

    fetchReviews();
  }, [id]);

if (!movie) {
  return <Text>Loading...</Text>;
}

  const HEADER_HEIGHT = 265; // Adjust based on your Header component height

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, HEADER_HEIGHT],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const stickyHeaderOpacity = scrollY.interpolate({
    inputRange: [265, HEADER_HEIGHT - 0],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView edges={['top']} style={{ flex: 1, backgroundColor: '#fff' }}>
        <View style={{ flex: 1, backgroundColor: "#fff" }}>
            <DetailHeader title={movie.title} />
            <Animated.View
                style={[
                    styles.stickyHeader,
                    {
                    transform: [{ translateY: headerTranslateY }],
                    opacity: stickyHeaderOpacity,
                    },
                ]}>
                <ScrollView showsHorizontalScrollIndicator={false} style={{ paddingHorizontal: 16, paddingVertical: 8 }} >            
                    <Text style={styles.title}>{movie.title}</Text>
                    <StarRating rating={movie.average_rating} reviewCount={movie.review_count} />
                </ScrollView>
            </Animated.View>

        <Animated.ScrollView
            scrollEventThrottle={16}
            onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: false }
            )}>
                <ScrollView contentContainerStyle={styles.container} style={{ borderBottomColor: '#f9f9f9', borderBottomWidth: 4 }}>
                    <View style={styles.banner}>
                        <Image source={{ uri: movie.poster_full }} style={styles.image} />
                        <Text style={styles.title}>{movie.title}</Text>
                        <StarRating rating={movie.average_rating} reviewCount={movie.review_count} />
                    </View>

                    <View style={styles.overview}>
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Summary</Text>
                            <Text style={styles.description}>{movie.description}</Text>
                            <TrailerModal trailerUrl={movie.trailer_url} />
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Released Date:{' '}
                        {movie.release_date && (
                            <Text style={styles.description}>{movie.release_date}</Text>
                        )}</Text>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Cast</Text>
                            <Text style={styles.description}>{movie.cast?.map((g) => g.name).join(', ')}</Text>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Director</Text>
                            <Text style={styles.description}>{movie.directors?.map((g) => g.name).join(', ')}</Text>
                        </View>

                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Genre:{' '}
                                <Text style={styles.description}>{movie.genre?.map((g) => g.name).join(', ')}</Text>
                            </Text>
                        </View>
                        
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Movie Type:{' '}
                                <Text style={styles.description}>{movie.movie_type}</Text>
                            </Text>                            
                        </View>
                        
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Duration:{' '}
                                <Text style={styles.description}>{movie.duration} Minutes</Text>
                            </Text>                            
                        </View>
                        
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Age Rating:{' '}
                                <Text style={styles.description}>{movie.age_rating}</Text>
                            </Text>                            
                        </View>
                        
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Country:{' '}
                                <Text style={styles.description}>{movie.country}</Text>
                            </Text>                            
                        </View>
                        
                        <View style={styles.section}>
                            <Text style={styles.sectionTitle}>Language:{' '}
                                <Text style={styles.description}>{movie.language}</Text>
                            </Text>                            
                        </View>
                    </View>
                        
                </ScrollView>
                <ScrollView contentContainerStyle={styles.container}>
                    <Text style={styles.title}>Reviews</Text> 
                    {reviews.map((review, index) => (
                      <View key={index} style={styles.reviewSection}>
                        <View style={{ marginBottom: 8 }}>
                          <Text style={styles.reviewUsername}>{review.username} {''}
                            <Text style={styles.experienced}>Experienced on {new Date(review.date_experienced).toDateString()}</Text>
                          </Text>
                        </View>
                        <View style={{ marginBottom: 8, display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                          <View style={{ flexDirection: 'row', marginBottom: 4, marginRight: 6 }}>
                            {[...Array(5)].map((_, index) => (
                            <Text
                              key={index}
                              style={{
                                color: index < review.rating ? '#FFD700' : '#ccc',
                                fontSize: 20,
                                marginRight: 2,
                              }}
                            >
                              ★
                            </Text>
                          ))}
                          </View>
                        </View>
                        <Text style={styles.reviewText}>{capitalize(review.review_text)}</Text>
                        
                        {review.image && (
                          <Image
                            source={{ uri: review.image }}
                            style={{ width: '100%', height: 200, borderRadius: 8, marginTop: 16, marginBottom: 12 }}
                            resizeMode="cover"
                          />
                        )}
                        <Text style={styles.reviewDate}>{new Date(review.created_at).toDateString()}</Text>
                      </View>
                    ))}
              </ScrollView>
            </Animated.ScrollView>
        </View>
        <WriteReviewButton movieId={movie.id} isLoggedIn={!!user} />
        {/* <FloatingButtons movieId={movie.id} isLoggedIn={!!user} /> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  stickyHeader: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    zIndex: 10,
    backgroundColor: '#fff',
    paddingBottom: 8,
    paddingTop: 16,
  },
  container: {
    flex: 0,
    paddingTop: 16,
    paddingHorizontal: 16,
    backgroundColor: "#fff",
    justifyContent: "center",
  },
  section: {
    marginBottom: 16,
  },
  reviewSection: { 
    marginBottom: 12, 
    padding: 16, 
    backgroundColor: '#f7f7f7ff', 
    borderRadius: 8, 
  },
  reviewUsername: {
    fontWeight: 'bold',
    fontFamily: 'Futura-Bold',
    fontSize: 15,
    color: '#5A3EFF'
  },
  experienced: { 
    color: '#999',
    fontFamily: 'Worksans-Medium',
    fontSize: 14,
  },
  reviewDate: { 
    color: '#666',
    fontFamily: 'Worksans-Medium',
    fontSize: 14,
    marginTop: 8,
  },
  reviewText: {
    fontSize: 14,
    lineHeight: 20,
    fontFamily: "Futura-Bold",
  },
  banner: {
    paddingBottom: 16,
    borderBottomColor: '#f5f5f5ff',
    borderBottomWidth: 1,
  },
  overview: {
    paddingVertical: 16,
  },
  image: {
    width: '100%',
    height: 250,
    borderRadius: 8,
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
    fontFamily: 'Futura-Bold',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
    fontFamily: 'Futura-Bold',
    color: "#525252ff",
  },
  genre: {
    fontSize: 16,
    color: 'red',
    marginBottom: 4,
  },
  date: {
    fontSize: 14,
    marginBottom: 12,
    color: '#666',
    fontFamily: "Worksans-Medium",
  },
  description: {
    fontSize: 15,
    lineHeight: 22,
    fontFamily: "Worksans-Regular",
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    marginBottom: 30,
  },
  headerLogo: {
    width: 120,
    height: 40,
  },
  movieTitle: {
    flex: 1,
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 12,
    color: '#000',
  },
});

export default MoviesDetailScreen;
