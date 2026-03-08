import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Alert, FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CheckoutOrderItem from '../components/CheckoutOrderItem';
import PriceSummaryRow from '../components/PriceSummaryRow';
import { useCartStore } from '../store/cartStore';
import { CartItem, TabParamList } from '../types';

type CheckoutScreenNavigationProp = BottomTabNavigationProp<TabParamList, 'Cart'>;

export default function CheckoutScreen() {
  const navigation = useNavigation<CheckoutScreenNavigationProp>();
  const items = useCartStore((state) => state.items);
  const clearCart = useCartStore((state) => state.clearCart);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.1;
  const total = subtotal + tax;

  const handlePlaceOrder = () => {
    clearCart();

    Alert.alert(
      '🎉 Order Placed Successfully!',
      'Your order will be ready in 20 minutes.',
      [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Menu'),
        },
      ]
    );
  };

  const renderItem = ({ item }: { item: CartItem }) => (
    <CheckoutOrderItem item={item} />
  );

  // ⭐ Handle Empty Cart
  if (items.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Checkout</Text>
        <Text style={styles.emptyText}>Your cart is empty 🛒</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Order Summary</Text>

      {/* Pickup Info */}
      <View style={styles.pickupInfo}>
        <Text style={styles.pickupText}>📍 Pickup Location: Demo Restaurant</Text>
        <Text style={styles.estimatedTime}>⏰ Estimated Time: 20 minutes</Text>
      </View>

      {/* Order Items */}
      <View style={styles.orderSection}>
        <Text style={styles.sectionTitle}>Your Order</Text>

        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          style={styles.orderList}
        />
      </View>

      {/* Order Summary */}
      <View style={styles.summarySection}>
        <PriceSummaryRow
          label="Subtotal"
          value={`$${subtotal.toFixed(2)}`}
        />
        <PriceSummaryRow
          label="Tax (10%)"
          value={`$${tax.toFixed(2)}`}
        />
        <PriceSummaryRow
          label="Total"
          value={`$${total.toFixed(2)}`}
          isTotal
        />
      </View>

      {/* ⭐ Disable button if empty */}
      <TouchableOpacity
        style={[
          styles.placeOrderButton,
          items.length === 0 && { opacity: 0.5 }
        ]}
        onPress={handlePlaceOrder}
        activeOpacity={0.8}
        disabled={items.length === 0}
      >
        <Text style={styles.placeOrderText}>Place Order</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
  },

  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },

  emptyText: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#666',
  },

  pickupInfo: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  pickupText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },

  estimatedTime: {
    fontSize: 16,
    color: '#666',
  },

  orderSection: {
    flex: 1,
    marginBottom: 20,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },

  orderList: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  summarySection: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  placeOrderButton: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },

  placeOrderText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});