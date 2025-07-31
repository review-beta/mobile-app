import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

const cities = [
  'Lagos', 'Abuja', 'Kano', 'Ibadan', 'Port Harcourt', 'Benin City', 'Maiduguri',
  'Zaria', 'Aba', 'Jos', 'Ilorin', 'Enugu', 'Abeokuta', 'Onitsha', 'Warri',
  'Sokoto', 'Osogbo', 'Awka', 'Yola', 'Calabar', 'Uyo', 'Lokoja', 'Makurdi',
  'Owerri', 'Bauchi', 'Katsina', 'Akure', 'Minna', 'Gombe', 'Abakaliki'
];

const CustomDropdown = () => {
  const [selected, setSelected] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const handleSelect = (city: string) => {
    setSelected(city);
    setOpen(false);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setOpen(true)} style={styles.button}>
        <Text style={styles.selectedText}>
          {selected || 'Your City'}
        </Text>
        <Icon name={open ? 'chevron-up' : 'chevron-down'} size={18} color="#5A3EFF" />
      </TouchableOpacity>

      <Modal
        transparent
        visible={open}
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        <TouchableWithoutFeedback onPress={() => setOpen(false)}>
          <View style={styles.modalOverlay}>
            <View style={styles.dropdown}>
              <FlatList
                data={cities}
                keyExtractor={(item) => item}
                style={{ maxHeight: 300 }}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => handleSelect(item)}
                    style={[
                      styles.option,
                      selected === item && styles.selectedOption
                    ]}
                  >
                    <Text style={styles.optionText}>{item}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
};

export default CustomDropdown;

const styles = StyleSheet.create({
  container: {
    marginVertical: 12,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    borderRadius: 8,
    justifyContent: 'space-between',
    gap: 4,
    marginBottom: -6.2,
  },
  selectedText: {
    color: '#5A3EFF',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 0,
    fontFamily: 'Futura-Bold',
  },
  arrow: {
    color: '#5A3EFF',
    fontSize: 14,
    marginLeft: 8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 20,
  },
  dropdown: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 10,
    elevation: 4,
  },
  option: {
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  selectedOption: {
    backgroundColor: '#eeeaff',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    fontFamily: 'Futura-Bold',
  },
});
