import React, { useState } from "react";
import {
  View,
  Modal,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Image,
  Keyboard,
  TouchableWithoutFeedback,
  Platform,
  Pressable,
  Alert,
  KeyboardAvoidingView
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import DateTimePicker from "@react-native-community/datetimepicker";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../../contexts/AuthContext";
import API from "../api/client";

type WriteReviewButtonProps = {
  movieId: number;
  isLoggedIn: boolean;
};

const WriteReviewButton: React.FC<WriteReviewButtonProps> = ({ movieId, isLoggedIn }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [rating, setRating] = useState<number>(0);
  const [reviewText, setReviewText] = useState("");
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [dateExperienced, setDateExperienced] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const clearForm = () => {
    setReviewText('');
    setRating(0);
    setImageUri(null);
  };

  const navigation = useNavigation();

  const handlePickImage = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (!permissionResult.granted) return;

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 0.7,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleLoginRedirect = () => {
    navigation.navigate("Login", {
      redirectTo: "MovieDetailScreen", // adjust to match your detail route name
    });
  };

const handleSubmit = async () => {
  if (!rating || !reviewText || !dateExperienced) {
    setError("Validation Error, Please fill in all required fields.");
    return;
  }

  try {
    setIsSubmitting(true);
    setError(null);

    const formData = new FormData();
    formData.append("rating", rating.toString());
    formData.append("review_text", reviewText);
    formData.append("date_experienced", dateExperienced.toISOString().split("T")[0]);
    formData.append("content_type", "movies.movie");
    formData.append("object_id", movieId.toString());

    if (imageUri) {
      const fileName = imageUri.split("/").pop() || "image.jpg";
      formData.append("image", {
        uri: imageUri,
        name: fileName,
        type: "image/jpeg",
      } as any);
    }

    // 🔍 Debug form data keys
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}:`, pair[1]);
    }

    const res = await API.post("/reviews/", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${user?.access}`,
      },
    });

    if (res.status === 201) {
      setError("Success! Review submitted.");
      clearForm();
      setModalVisible(false);
      setError(null);
    }
  } catch (err: any) {
    console.error("Review submission error", err.response?.data || err.message);
    Alert.alert("Error", "Could not submit review. Please check the fields and try again.");
  } finally {
    setIsSubmitting(false);
  }
};

  return (
    <>
      {isLoggedIn ? (
        <TouchableOpacity style={styles.floatingButton} onPress={() => setModalVisible(true)}>
          <Ionicons name="create-outline" size={24} color="#fff" />
          <Text style={styles.floatingText}>Write a Review</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles.floatingButton} onPress={handleLoginRedirect}>
          <Ionicons name="log-in-outline" size={24} color="#fff" />
          <Text style={styles.floatingText}>Login to Review</Text>
        </TouchableOpacity>
      )}

      {/* Modal Form */}
      <Modal
        visible={modalVisible}
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <TouchableWithoutFeedback onPress={() => {
          Keyboard.dismiss();
          setModalVisible(false);
        }}>
          <View style={styles.modalOverlay}>
            <Pressable
              style={styles.modalContent}
              onPress={() => {}} // prevent tap bubbling to overlay
            >
              <Text style={styles.modalTitle}>Write a Review</Text>

              {/* Rating */}
              <View style={styles.ratingContainer}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <TouchableOpacity key={i} onPress={() => setRating(i)}>
                    <Ionicons
                      name={i <= rating ? "star" : "star-outline"}
                      size={24}
                      color="#FFD700"
                    />
                  </TouchableOpacity>
                ))}
              </View>

              {/* Review Input */}
              <TextInput
                style={styles.textInput}
                placeholder="Write your review..."
                value={reviewText}
                onChangeText={setReviewText}
                multiline
              />

              {/* Image Picker */}
              {imageUri && (
                <View>
                  <Image source={{ uri: imageUri }} style={styles.imagePreview} />
                  <TouchableOpacity onPress={() => setImageUri(null)}>
                    <Text style={styles.deleteImageText}>Remove image</Text>
                  </TouchableOpacity>
                </View>
              )}
              <TouchableOpacity onPress={handlePickImage} style={styles.imageButton}>
                <Text style={styles.imageButtonText}>
                  {imageUri ? "Change Image" : "Add Image (Optional)"}
                </Text>
              </TouchableOpacity>

              {/* Date Picker */}
              <TouchableOpacity
                onPress={() => setShowDatePicker(true)}
                style={styles.dateButton}
              >
                <Text style={styles.dateButtonText}>
                  {`Date Experienced: ${dateExperienced.toDateString()}`}
                </Text>
              </TouchableOpacity>
              {showDatePicker && (
                <DateTimePicker
                  value={dateExperienced}
                  mode="date"
                  display="default"
                  maximumDate={new Date()}
                  onChange={(event, selectedDate) => {
                    setShowDatePicker(false);
                    if (selectedDate) setDateExperienced(selectedDate);
                  }}
                />
              )}

              {error ? <Text style={styles.error}>{error}</Text> : null}

              {/* Submit Button */}

              <TouchableOpacity
                onPress={handleSubmit}
                 style={styles.submitButton}
                disabled={isSubmitting}
              >
                <Text style={styles.submitButtonText}>
                  {isSubmitting ? 'Submitting...' : 'Submit Review'}
                </Text>
              </TouchableOpacity>

              {/* Close Modal */}
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.cancelButton}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </Pressable>
          </View>
        </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
      </Modal>
    </>
  );
};

export default WriteReviewButton;

const styles = StyleSheet.create({
  floatingButton: {
    position: "absolute",
    bottom: 16,
    right: 16,
    backgroundColor: "#5A3EFF",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 30,
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    flexDirection: "row",
    alignItems: "center",
  },
  floatingText: {
    color: "#fff",
    marginLeft: 8,
    fontWeight: "600",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    maxHeight: "90%",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 12,
  },
  ratingContainer: {
    flexDirection: "row",
    marginBottom: 12,
  },
  textInput: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    minHeight: 80,
    marginBottom: 12,
    textAlignVertical: "top",
  },
  imageButton: {
    marginBottom: 10,
  },
  imageButtonText: {
    color: "#007AFF",
  },
  deleteImageText: {
    color: "red",
    marginBottom: 10,
    textAlign: "right",
  },
  imagePreview: {
    width: "100%",
    height: 180,
    borderRadius: 8,
    marginBottom: 4,
  },
  dateButton: {
    marginBottom: 10,
  },
  dateButtonText: {
    color: "#007AFF",
  },
  submitButton: {
    backgroundColor: "#007AFF",
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  submitButtonText: {
    color: "#fff",
    textAlign: "center",
    fontWeight: "bold",
  },
  cancelButton: {
    paddingVertical: 10,
    alignItems: "center",
    marginTop: 6,
  },
  cancelText: {
    color: "#999",
  },
  error: {
    color: "red",
    marginBottom: 8,
    fontSize: 14,
    fontFamily: "Worksans-Regular",
    textAlign: "center",
  },
});
