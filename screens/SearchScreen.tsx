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
    <TouchableOpacity key={keyword} style={styles.chip} onPress={() => setSearchText(keyword)} activeOpacity={0.8}>
      <Text style={styles.chipText}>{keyword}</Text>
    </TouchableOpacity>
  );

  const filtered = searchText
    ? SUGGESTED.filter((s) => s.name.toLowerCase().includes(searchText.toLowerCase()))
    : SUGGESTED;

  const renderSuggestedItem = ({ item }: { item: typeof SUGGESTED[0] }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push(`/restaurant/${item.id}` as any)}
      activeOpacity={0.85}
    >
      <Image source={{ uri: item.img }} style={styles.cardImg} />
      <View style={styles.cardBody}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingText}>⭐ {item.rating}</Text>
          </View>
        </View>
        <Text style={styles.cardSubtitle}>Fast delivery • Affordable</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 20 }}>
        {/* Header */}
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
            <Ionicons name="chevron-back" size={20} color="#333" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Search restaurants</Text>
          <TouchableOpacity onPress={() => setSearchText('')} style={styles.clearBtn}>
            <Text style={{ color: '#666' }}>Clear</Text>
          </TouchableOpacity>
        </View>

        {/* Search Box */}
        <View style={styles.searchBoxWrap}>
          <View style={styles.searchBox}>
            <Ionicons name="search-outline" size={20} color="#9AA0A6" />
            <TextInput
              placeholder="Search restaurants or dishes"
              style={styles.searchInput}
              value={searchText}
              onChangeText={setSearchText}
              placeholderTextColor="#9AA0A6"
            />
            {searchText.length > 0 && (
              <TouchableOpacity onPress={() => setSearchText('')}>
                <Ionicons name="close-circle" size={20} color="#D3D1D8" />
              </TouchableOpacity>
            )}
          </View>
        </View>

        {/* Recent Keywords */}
        <Text style={styles.subTitle}>Recent Keywords</Text>
        <View style={styles.keywordRow}>{RECENT_KEYWORDS.map(renderKeyword)}</View>

        {/* Suggested Restaurants / Results */}
        <Text style={styles.subTitle}>{searchText ? `Results (${filtered.length})` : 'Suggested Restaurants'}</Text>
        {filtered.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyTitle}>No results found</Text>
            <Text style={{ color: '#777', marginTop: 8 }}>Try different keywords or remove filters.</Text>
          </View>
        ) : (
          <FlatList
            data={filtered}
            keyExtractor={(item) => item.id}
            renderItem={renderSuggestedItem}
            scrollEnabled={false} // FlatList inside ScrollView
            ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  headerRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 },
  backBtn: { backgroundColor: '#F6F6F6', padding: 8, borderRadius: 10, width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  clearBtn: { paddingHorizontal: 6 },
  headerTitle: { fontSize: 18, fontWeight: '700', color: '#222' },
  searchBoxWrap: { marginBottom: 14 },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F6F9',
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
  },
  searchInput: { flex: 1, marginLeft: 10, color: '#222' },
  subTitle: { fontSize: 16, fontWeight: '600', marginTop: 25, marginBottom: 12 },
  keywordRow: { flexDirection: 'row', flexWrap: 'wrap' },
  chip: {
    borderWidth: 0,
    backgroundColor: '#EEF6FF',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 10,
    marginBottom: 10,
  },
  chipText: { color: '#1B6EDC', fontWeight: '600' },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  cardImg: { width: 62, height: 62, borderRadius: 10, backgroundColor: '#EEE' },
  cardBody: { flex: 1, marginLeft: 12 },
  cardTitle: { fontWeight: '700', fontSize: 15, color: '#212121' },
  cardSubtitle: { color: '#6F7780', marginTop: 4 },
  ratingBadge: { backgroundColor: '#FFF7E6', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 10 },
  ratingText: { fontWeight: '700', color: '#FF8A00' },
  suggestedImg: { width: 50, height: 50, borderRadius: 10 },
  suggestedName: { fontWeight: 'bold', fontSize: 14 },
  emptyState: { padding: 28, alignItems: 'center' },
  emptyTitle: { fontSize: 16, fontWeight: '700' },
});
