import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, FlatList, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { getSelectedRestaurant } from '@/lib/selectedRestaurant';
import { restaurants } from '@/data/restaurants';
import { useCart } from '@/lib/CartContext';

const DUMMY_MENU = [
  { id: 'm1', name: 'Classic Burger', price: 6.5 },
  { id: 'm2', name: 'Cheese Pizza', price: 8.0 },
  { id: 'm3', name: 'Veg Sandwich', price: 5.0 },
  { id: 'm4', name: 'French Fries', price: 3.0 },
];

const DISCOUNTS = [
  { id: 'd1', code: 'WELCOME10', desc: '10% off for new users' },
  { id: 'd2', code: 'FAV5', desc: '$5 off orders over $25' },
];

export default function RestaurantPage() {
  const router = useRouter();
  const { addItem } = useCart();

  const id = getSelectedRestaurant();
  const restaurant = restaurants.find((r) => r.id === id) || restaurants[0];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backBtn}>
          <Text style={{ fontSize: 18 }}>{'‹'}</Text>
        </TouchableOpacity>
        <Text style={styles.title}>{restaurant.name}</Text>
      </View>

      <Image source={{ uri: restaurant.image }} style={styles.hero} />

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Menu</Text>
        <FlatList
          data={DUMMY_MENU}
          keyExtractor={(i) => i.id}
          renderItem={({ item }) => (
            <View style={styles.menuItem}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <View style={styles.thumb} />
                <View style={{ marginLeft: 12 }}>
                  <Text style={styles.menuName}>{item.name}</Text>
                  <Text style={styles.menuPrice}>${item.price.toFixed(2)}</Text>
                </View>
              </View>
              <TouchableOpacity
                style={styles.addBtn}
                onPress={() => addItem({ id: item.id, name: item.name, price: item.price })}
              >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>ADD</Text>
              </TouchableOpacity>
            </View>
          )}
          ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Discounts</Text>
        {DISCOUNTS.map((d) => (
          <View key={d.id} style={styles.discountRow}>
            <Text style={{ fontWeight: '700' }}>{d.code}</Text>
            <Text style={{ color: '#666' }}>{d.desc}</Text>
          </View>
        ))}
      </View>

      <TouchableOpacity style={styles.viewCart} onPress={() => router.push('/cart' as any)}>
        <Text style={{ color: 'white', fontWeight: '700' }}>View Cart</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { flexDirection: 'row', alignItems: 'center', padding: 16 },
  backBtn: { padding: 8, backgroundColor: '#F3F3F3', borderRadius: 8 },
  title: { fontSize: 18, fontWeight: '700', marginLeft: 12 },
  hero: { width: '100%', height: 180, borderRadius: 8 },
  section: { padding: 16 },
  sectionTitle: { fontSize: 16, fontWeight: '700', marginBottom: 12 },
  menuItem: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  thumb: { width: 60, height: 60, borderRadius: 8, backgroundColor: '#EEE' },
  menuName: { fontWeight: '700' },
  menuPrice: { color: '#666' },
  addBtn: { backgroundColor: '#FF7A00', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 8 },
  discountRow: { paddingVertical: 8, borderBottomColor: '#F3F3F3', borderBottomWidth: 1 },
  viewCart: { backgroundColor: '#181C2E', padding: 16, margin: 16, borderRadius: 12, alignItems: 'center' },
});
