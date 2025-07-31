import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const StarRating = ({
  rating = 0,
  maxStars = 5,
  reviewCount = 0,
}: {
  rating: number;
  maxStars?: number;
  reviewCount?: number;
}) => {
  const stars = [];

  for (let i = 1; i <= maxStars; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(<FontAwesome key={i} name="star" size={24} color="#facc15" />); // yellow-400
    } else if (i - rating < 1) {
      stars.push(<FontAwesome key={i} name="star-half-full" size={24} color="#facc15" />);
    } else {
      stars.push(<FontAwesome key={i} name="star-o" size={24} color="#facc15" />);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.stars}>{stars}</View>
      <Text style={styles.text}>
        {rating.toFixed(1)} out of 5 ({reviewCount} reviews)
      </Text>
    </View>
  );
};

export default StarRating;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  stars: {
    flexDirection: "row",
    marginRight: 6,
  },
  text: {
    fontSize: 14,
    fontFamily: "Worksans-Medium",
    color: "#4b5563", // gray-600
  },
});