import React from 'react';
import { SafeAreaView, View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { useCart } from '@/lib/CartContext';

export default function CartPage() {
  const { items, removeItem, clearCart } = useCart();

  const total = items.reduce((s, i) => s + i.price * i.qty, 0);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Cart</Text>
      </View>

      <FlatList
        data={items}
        keyExtractor={(i) => i.id}
        ListEmptyComponent={() => (
          <View style={{ padding: 20 }}>
            <Text style={{ color: '#666' }}>Your cart is empty.</Text>
          </View>
        )}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <View>
              <Text style={{ fontWeight: '700' }}>{item.name}</Text>
              <Text style={{ color: '#666' }}>${(item.price * item.qty).toFixed(2)} · {item.qty}x</Text>
            </View>
            <TouchableOpacity onPress={() => removeItem(item.id)} style={styles.removeBtn}>
              <Text style={{ color: 'white' }}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
        ItemSeparatorComponent={() => <View style={{ height: 12 }} />}
        contentContainerStyle={{ padding: 16 }}
      />

      <View style={styles.footer}>
        <Text style={styles.total}>Total: ${total.toFixed(2)}</Text>
        <TouchableOpacity style={styles.checkout} onPress={() => clearCart()}>
          <Text style={{ color: 'white', fontWeight: '700' }}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  header: { padding: 16 },
  title: { fontSize: 20, fontWeight: '800' },
  row: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 8 },
  removeBtn: { backgroundColor: '#FF7A00', padding: 8, borderRadius: 8 },
  footer: { padding: 16, borderTopWidth: 1, borderTopColor: '#F3F3F3' },
  total: { fontSize: 18, fontWeight: '800', marginBottom: 12 },
  checkout: { backgroundColor: '#181C2E', padding: 14, borderRadius: 10, alignItems: 'center' },
});
