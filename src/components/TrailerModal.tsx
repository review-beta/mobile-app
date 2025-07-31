import React, { useState } from "react";
import { View, Text, Modal, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import { WebView } from "react-native-webview";

const TrailerModal = ({ trailerUrl }: { trailerUrl: string }) => {
  const [modalVisible, setModalVisible] = useState(false);

  // Extract video ID from the URL
  const getYouTubeEmbedUrl = (url: string) => {
    const videoIdMatch = url.match(/(?:v=|\/)([0-9A-Za-z_-]{11})(?:\?|&|$)/);
    return videoIdMatch ? `https://www.youtube.com/embed/${videoIdMatch[1]}?autoplay=1` : "";
  };

  const embedUrl = getYouTubeEmbedUrl(trailerUrl);

  return (
    <View>
      <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>🎬 Watch Trailer</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <WebView
              style={{ flex: 1 }}
              javaScriptEnabled
              source={{ uri: embedUrl }}
            />
            <TouchableOpacity style={styles.closeButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TrailerModal;

const { width } = Dimensions.get("window");
const styles = StyleSheet.create({
  button: {
    backgroundColor: "#dc2626", // red-600
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignSelf: "flex-start",
    marginTop: 12,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "600",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "#000000cc",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: width * 0.9,
    height: width * 0.56,
    backgroundColor: "#000",
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
  },
  closeButton: {
    position: "absolute",
    top: 8,
    right: 8,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 4,
    zIndex: 1,
  },
  closeText: {
    fontSize: 16,
    color: "#000",
    fontWeight: "bold",
  },
});