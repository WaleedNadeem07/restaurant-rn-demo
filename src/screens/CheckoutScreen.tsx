import React from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
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
    <View style={styles.orderItem}>
        <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemQuantity}>x {item.quantity}</Text>
        </View>
        <Text style={styles.itemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
    </View>
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
        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Subtotal</Text>
          <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
        </View>

        <View style={styles.summaryRow}>
          <Text style={styles.summaryLabel}>Tax (10%)</Text>
          <Text style={styles.summaryValue}>${tax.toFixed(2)}</Text>
        </View>

        <View style={[styles.summaryRow, styles.totalRow]}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
        </View>
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

  orderItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },

  itemInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, 
    marginRight: 12, 
  },

  itemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },

  itemQuantity: {
    fontSize: 16,
    color: '#666',
    marginLeft: 8,
    fontWeight: '500',
  },

  itemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ff6b6b',
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

  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },

  summaryLabel: {
    fontSize: 16,
    color: '#666',
  },

  summaryValue: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
  },

  totalRow: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    paddingTop: 12,
    marginTop: 8,
  },

  totalLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },

  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ff6b6b',
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