import React from 'react';
import { View, ActivityIndicator, StyleSheet, Modal } from 'react-native';

const Loader = ({ visible = false }) => {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
    >
      <View style={styles.overlay}>
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
        </View>
      </View>
    </Modal>
  );
};

export default Loader;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loaderContainer: {
    padding: 20,
    borderRadius: 10,
    backgroundColor: '#fff',
  },
});