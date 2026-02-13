import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Modal,
  TextInput,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Ionicons, MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';

const { width, height } = Dimensions.get('window');

// --- Mock Data ---

const CATEGORIES = ['Burger', 'Sandwich', 'Pizza', 'Drinks', 'Dessert'];

const OFFERS = [
  {
    id: '1',
    title: 'Lunch Special',
    description: '20% off on all heavy meals',
    code: 'LUNCH20',
  },
  {
    id: '2',
    title: 'Free Coke',
    description: 'Get a free coke with every burger',
    code: 'FREECKE',
  },
];

const MENU_ITEMS = [
  {
    id: '1',
    name: 'Burger Ferguson',
    restaurant: 'Spicy Restaurant',
    description: 'Double beef patty with cheddar cheese and special sauce.',
    price: 40,
    calories: 850,
    ingredients: ['Beef', 'Cheddar', 'Lettuce', 'Bun'],
    allergens: ['Gluten', 'Dairy'],
    category: 'Burger',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: '2',
    name: "Rockin' Burgers",
    restaurant: 'Cafecafachino',
    description: 'Spicy chicken burger with jalapenos.',
    price: 40,
    calories: 720,
    ingredients: ['Chicken', 'Jalapenos', 'Mayo'],
    allergens: ['Gluten', 'Eggs'],
    category: 'Burger',
    image: 'https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: '3',
    name: 'Classic Cheese',
    restaurant: 'Spicy Restaurant',
    description: 'Classic cheeseburger with pickles.',
    price: 35,
    calories: 600,
    ingredients: ['Beef', 'Cheese', 'Pickles'],
    allergens: ['Dairy'],
    category: 'Burger',
    image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
  {
    id: '4',
    name: 'Veggie Delight',
    restaurant: 'Green Eats',
    description: 'Grilled vegetable sandwich with pesto.',
    price: 15,
    calories: 350,
    ingredients: ['Zucchini', 'Peppers', 'Pesto', 'Whole Wheat'],
    allergens: ['Nuts'],
    category: 'Sandwich',
    image: 'https://images.unsplash.com/photo-1528735602780-2552fd46c7af?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60',
  },
];

const REVIEWS = [
  {
    id: 'r1',
    user: 'John Doe',
    rating: 5,
    comment: 'Amazing food and quick service! The burgers are top notch.',
    date: '2 days ago',
    avatar: 'https://i.pravatar.cc/150?img=68',
  },
  {
    id: 'r2',
    user: 'Alice Smith',
    rating: 4,
    comment: 'Great ambience, but the waiting time was a bit long.',
    date: '1 week ago',
    avatar: 'https://i.pravatar.cc/150?img=47',
  },
];

export default function RestaurantPage() {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState('Burger');
  const [isBookingVisible, setBookingVisible] = useState(false);
  const [isOffersVisible, setOffersVisible] = useState(false);

  // Booking State
  const [guests, setGuests] = useState('2');
  const [date, setDate] = useState('Today, 8:00 PM');

  const filteredItems = MENU_ITEMS.filter(item => item.category === selectedCategory);

  const handleBookTable = () => {
    // Integrate with backend API here
    Alert.alert('Success', `Table booked for ${guests} guests at ${date}!`);
    setBookingVisible(false);
  };

  const handleScanMenu = () => {
    Alert.alert('AI Scan', 'Launching AI Camera to scan menu items...');
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={24} color="#181C2E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Restaurant Details</Text>
        <TouchableOpacity style={styles.iconButton} onPress={handleScanMenu}>
          {/* AI Feature Entry Point */}
          <Ionicons name="scan-outline" size={24} color="#181C2E" />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        {/* Hero Image */}
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80' }}
          style={styles.heroImage}
        />

        {/* Restaurant Info */}
        <View style={styles.infoSection}>
          <Text style={styles.restaurantName}>Spicy Restaurant</Text>
          <Text style={styles.description}>
            Fine dining experience with modern fusion cuisine. Pre-order your meals or book a table now.
          </Text>

          {/* Stats */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Ionicons name="star" size={18} color="#FF7622" />
              <Text style={styles.statText}>4.7</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="navigate-outline" size={18} color="#FF7622" />
              <Text style={styles.statText}>2.5 km</Text>
            </View>
            <View style={styles.statItem}>
              <Ionicons name="time-outline" size={18} color="#FF7622" />
              <Text style={styles.statText}>20 min</Text>
            </View>
          </View>

          {/* Action Buttons Row */}
          <View style={styles.actionRow}>
            <TouchableOpacity style={styles.actionButton} onPress={() => setBookingVisible(true)}>
              <MaterialCommunityIcons name="table-chair" size={20} color="#FFF" />
              <Text style={styles.actionButtonText}>Book Table</Text>
            </TouchableOpacity>

            <TouchableOpacity style={[styles.actionButton, styles.secondaryBtn]} onPress={() => setOffersVisible(true)}>
              <MaterialCommunityIcons name="tag-outline" size={20} color="#FFF" />
              <Text style={styles.actionButtonText}>Offers</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Menu Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Menu</Text>
          <TouchableOpacity><Text style={styles.seeAll}>See All</Text></TouchableOpacity>
        </View>

        {/* Categories */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoriesContainer}
        >
          {CATEGORIES.map((cat) => (
            <TouchableOpacity
              key={cat}
              style={[
                styles.categoryButton,
                selectedCategory === cat && styles.categoryButtonActive,
              ]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text
                style={[
                  styles.categoryText,
                  selectedCategory === cat && styles.categoryTextActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

        {/* Menu Items Grid */}
        <View style={styles.popularSection}>
          {filteredItems.length > 0 ? (
            <View style={styles.grid}>
              {filteredItems.map((item) => (
                <View key={item.id} style={styles.card}>
                  <Image source={{ uri: item.image }} style={styles.cardImage} />
                  <View style={styles.cardContent}>
                    <Text style={styles.cardTitle}>{item.name}</Text>
                    {/* Ingredient/Calorie info small */}
                    <Text style={styles.cardMeta}>{item.calories} kcal • {item.ingredients[0]}</Text>

                    <View style={styles.priceRow}>
                      <Text style={styles.priceText}>${item.price}</Text>
                      <TouchableOpacity style={styles.addButton}>
                        <Ionicons name="add" size={24} color="#FFF" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              ))}
            </View>
          ) : (
            <Text style={{ textAlign: 'center', color: '#999', marginTop: 20 }}>No items in this category yet.</Text>
          )}
        </View>

        {/* Reviews Section */}
        <View style={styles.reviewsSection}>
          <Text style={styles.sectionTitle}>Reviews & Ratings</Text>
          {REVIEWS.map(review => (
            <View key={review.id} style={styles.reviewCard}>
              <Image source={{ uri: review.avatar }} style={styles.avatar} />
              <View style={{ flex: 1 }}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text style={styles.reviewName}>{review.user}</Text>
                  <Text style={styles.reviewDate}>{review.date}</Text>
                </View>
                <View style={{ flexDirection: 'row', marginBottom: 4 }}>
                  {[1, 2, 3, 4, 5].map(s => (
                    <Ionicons key={s} name={s <= review.rating ? "star" : "star-outline"} size={14} color="#FF7622" />
                  ))}
                </View>
                <Text style={styles.reviewComment}>{review.comment}</Text>
              </View>
            </View>
          ))}
          <TouchableOpacity style={styles.writeReviewBtn}>
            <Text style={styles.writeReviewText}>Write a Review</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      {/* Booking Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={isBookingVisible}
        onRequestClose={() => setBookingVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Book a Table</Text>

            <Text style={styles.label}>Number of Guests</Text>
            <TextInput
              style={styles.input}
              value={guests}
              onChangeText={setGuests}
              keyboardType="number-pad"
            />

            <Text style={styles.label}>Date & Time</Text>
            <TextInput
              style={styles.input}
              value={date}
              onChangeText={setDate}
            />

            <TouchableOpacity style={styles.confirmBtn} onPress={handleBookTable}>
              <Text style={styles.confirmBtnText}>Confirm Booking</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.cancelBtn} onPress={() => setBookingVisible(false)}>
              <Text style={styles.cancelBtnText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* Offers Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={isOffersVisible}
        onRequestClose={() => setOffersVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Special Offers</Text>
            {OFFERS.map(offer => (
              <View key={offer.id} style={styles.offerCard}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.offerTitle}>{offer.title}</Text>
                  <Text style={styles.offerDesc}>{offer.description}</Text>
                </View>
                <View style={styles.codeBox}>
                  <Text style={styles.codeText}>{offer.code}</Text>
                </View>
              </View>
            ))}
            <TouchableOpacity style={styles.cancelBtn} onPress={() => setOffersVisible(false)}>
              <Text style={styles.cancelBtnText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  iconButton: {
    width: 45,
    height: 45,
    backgroundColor: '#F0F5FA',
    borderRadius: 22.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#181C2E',
  },
  scrollContent: {
    paddingBottom: 40,
  },
  heroImage: {
    width: width - 48,
    height: 180,
    borderRadius: 20,
    alignSelf: 'center',
    marginBottom: 20,
    backgroundColor: '#F0F5FA',
  },
  infoSection: {
    paddingHorizontal: 24,
    marginBottom: 20,
  },
  restaurantName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#181C2E',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    lineHeight: 22,
    color: '#A0A5BA',
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 24,
  },
  statText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#181C2E',
    marginLeft: 6,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor: '#FF7622',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  secondaryBtn: {
    backgroundColor: '#181C2E',
    marginRight: 0,
  },
  actionButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    marginLeft: 8,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#181C2E',
  },
  seeAll: {
    color: '#FF7622',
    fontWeight: '600',
  },
  categoriesContainer: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  categoryButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#EDEDED',
    backgroundColor: '#FFF',
    marginRight: 12,
  },
  categoryButtonActive: {
    backgroundColor: '#FF7622',
    borderColor: '#FF7622',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#181C2E',
  },
  categoryTextActive: {
    color: '#FFF',
  },
  popularSection: {
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  card: {
    width: (width - 60) / 2,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 12,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: '#F0F5FA',
    // Shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  cardImage: {
    width: '100%',
    height: 100,
    borderRadius: 15,
    marginBottom: 10,
    backgroundColor: '#F0F5FA',
  },
  cardContent: {},
  cardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#181C2E',
    marginBottom: 4,
  },
  cardMeta: {
    fontSize: 12,
    color: '#A0A5BA',
    marginBottom: 10,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#181C2E',
  },
  addButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#FF7622',
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewsSection: {
    paddingHorizontal: 24,
    marginBottom: 30,
  },
  reviewCard: {
    flexDirection: 'row',
    backgroundColor: '#F8F9FB',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  reviewName: {
    fontWeight: 'bold',
    color: '#181C2E',
    fontSize: 14,
  },
  reviewDate: {
    color: '#A0A5BA',
    fontSize: 12,
  },
  reviewComment: {
    color: '#666',
    fontSize: 13,
    marginTop: 4,
    lineHeight: 18,
  },
  writeReviewBtn: {
    padding: 12,
    borderWidth: 1,
    borderColor: '#181C2E',
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  writeReviewText: {
    fontWeight: '600',
    color: '#181C2E',
  },

  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    width: '100%',
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    color: '#A0A5BA',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#F0F5FA',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    fontSize: 16,
  },
  confirmBtn: {
    backgroundColor: '#FF7622',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  confirmBtnText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelBtn: {
    padding: 16,
    alignItems: 'center',
  },
  cancelBtnText: {
    color: '#A0A5BA',
    fontWeight: '600',
  },
  offerCard: {
    borderWidth: 1,
    borderColor: '#EEE',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  offerTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#FF7622',
  },
  offerDesc: {
    color: '#666',
    fontSize: 12,
  },
  codeBox: {
    backgroundColor: '#FFF4E5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#FF7622',
  },
  codeText: {
    fontWeight: 'bold',
    color: '#FF7622',
  },
});
