import { View, Text, ScrollView, Pressable } from 'react-native';
import { useState } from 'react';

const navItems = [
  { label: "For you", key: "for-you" },
  { label: "Movies", key: "movies" },
  { label: "Dining", key: "dining" },
  { label: "Events", key: "events" },
  { label: "Businesses", key: "businesses" },
  { label: "Activities", key: "activities" },
];

export default function CategoryTabs() {
  const [activeTab, setActiveTab] = useState("for-you");

  return (
    <View className="my-2">
      <ScrollView horizontal showsHorizontalScrollIndicator={false} className="flex-row gap-2">
        {navItems.map((item) => (
          <Pressable
            key={item.key}
            onPress={() => setActiveTab(item.key)}
            className={`px-4 py-2 rounded-full ${activeTab === item.key ? "bg-violet-200" : "bg-gray-100"}`}
          >
            <Text className={`${activeTab === item.key ? "text-violet-700 font-semibold" : "text-gray-700"}`}>
              {item.label}
            </Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}