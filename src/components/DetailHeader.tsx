import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Share, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

type DetailHeaderProps = {
  title: string;
  showShareButton?: boolean;
  containerStyle?: ViewStyle;
};

const DetailHeader: React.FC<DetailHeaderProps> = ({ title, showShareButton = true, containerStyle }) => {
  const navigation = useNavigation();

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out this movie: ${title}`,
      });
    } catch (error) {
      console.log("Error sharing:", error);
    }
  };

  return (
    <View style={[styles.header, containerStyle]}>
      {/* Back Button */}
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Ionicons name="chevron-back" size={28} color="black" />
      </TouchableOpacity>

      {/* Title */}
      <Text
        style={styles.title}
        numberOfLines={1}
        ellipsizeMode="tail"
      >
        {title}
      </Text>

      {/* Share Button or Spacer */}
      {showShareButton ? (
        <TouchableOpacity onPress={handleShare}>
          <Ionicons name="share-outline" size={24} color="black" />
        </TouchableOpacity>
      ) : (
        <View style={{ width: 24 }} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    top: 0,
    left: 0,
    right: 0,
    // paddingTop: 50,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    zIndex: 999,
    elevation: 5,
    paddingVertical: 16,
    shadowColor: "#444",
    shadowOffset: {
        width: 0,
        height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,

  },
  title: {
    flex: 1,
    fontSize: 18,
    fontWeight: "bold",
    marginHorizontal: 12,
    color: "#000",
    textAlign: "center",
  },
});

export default DetailHeader;