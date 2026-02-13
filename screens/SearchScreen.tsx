import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const RECENT_KEYWORDS = ['Burger', 'Sandwich', 'Pizza'];

const SUGGESTED = [
  { id: '1', name: 'Pansi Restaurant', rating: 4.7, img: 'https://via.placeholder.com/50' },
  { id: '2', name: 'American Spicy Burger', rating: 4.3, img: 'https://via.placeholder.com/50' },
  { id: '3', name: 'Rose Garden', rating: 4.6, img: 'https://via.placeholder.com/50' },
  { id: '4', name: 'Pizza Point', rating: 4.4, img: 'https://via.placeholder.com/50' },
];

export default function SearchScreen() {
  const [searchText, setSearchText] = useState('');
  const router = useRouter();

  const renderKeyword = (keyword: string) => (
    <TouchableOpacity key={keyword} style={styles.chip} onPress={() => setSearchText(keyword)}>
      <Text>{keyword}</Text>
    </TouchableOpacity>
  );

  const filtered = searchText
    ? SUGGESTED.filter((s) => s.name.toLowerCase().includes(searchText.toLowerCase()))
    : SUGGESTED;

  const renderSuggestedItem = ({ item }: { item: typeof SUGGESTED[0] }) => (
    <TouchableOpacity
      style={styles.suggestedItem}
      onPress={() => {
        // store selected id and navigate
        // import here to avoid circular/top-level ordering issues
        const { setSelectedRestaurant } = require('@/lib/selectedRestaurant');
        setSelectedRestaurant(item.id);
        router.push('/restaurant' as any);
      }}
    >
      <Image source={{ uri: item.img }} style={styles.suggestedImg} />
      <View style={{ marginLeft: 12 }}>
        <Text style={styles.suggestedName}>{item.name}</Text>
        <Text>⭐ {item.rating}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={24} color="black" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Search</Text>
        </View>

        {/* Search Box */}
        <View style={styles.searchBox}>
          <Ionicons name="search-outline" size={20} color="#676767" />
          <TextInput
            placeholder="Search restaurants or dishes"
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
          />
          {searchText.length > 0 && (
            <TouchableOpacity onPress={() => setSearchText('')}>
              <Ionicons name="close-circle" size={20} color="#D3D1D8" />
            </TouchableOpacity>
          )}
        </View>

        {/* Recent Keywords */}
        <Text style={styles.subTitle}>Recent Keywords</Text>
        <View style={styles.keywordRow}>{RECENT_KEYWORDS.map(renderKeyword)}</View>

        {/* Suggested Restaurants / Results */}
        <Text style={styles.subTitle}>{searchText ? 'Results' : 'Suggested Restaurants'}</Text>
        <FlatList
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={renderSuggestedItem}
          scrollEnabled={false} // FlatList inside ScrollView
          ItemSeparatorComponent={() => <View style={{ height: 15 }} />}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  backBtn: { backgroundColor: '#F6F6F6', padding: 10, borderRadius: 50 },
  headerTitle: { fontSize: 18, marginLeft: 20, fontWeight: '600' },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F6F6F6',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 15,
  },
  searchInput: { flex: 1, marginLeft: 10 },
  subTitle: { fontSize: 16, fontWeight: '600', marginTop: 25, marginBottom: 12 },
  keywordRow: { flexDirection: 'row', flexWrap: 'wrap' },
  chip: {
    borderWidth: 1,
    borderColor: '#EDEDED',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  suggestedItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F6F6F6',
  },
  suggestedImg: { width: 50, height: 50, borderRadius: 10 },
  suggestedName: { fontWeight: 'bold', fontSize: 14 },
});
