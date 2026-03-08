import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import React, { useMemo } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CartItemRow from '../components/CartItemRow';
import PriceSummaryRow from '../components/PriceSummaryRow';
import { useCartStore } from '../store/cartStore';
import { CartItem, TabParamList } from '../types';

type CartScreenNavigationProp = BottomTabNavigationProp<TabParamList, 'Cart'>;

export default function CartScreen() {
  const navigation = useNavigation<CartScreenNavigationProp>();
  const items = useCartStore((state) => state.items);
  const increaseQty = useCartStore((state) => state.increaseQty);
  const decreaseQty = useCartStore((state) => state.decreaseQty);
  const removeItem = useCartStore((state) => state.removeItem);
  
  // Calculate total using useMemo to update when items change
  const total = useMemo(() => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  }, [items]);

  const renderItem = ({ item }: { item: CartItem }) => (
    <CartItemRow
      item={item}
      onIncrease={increaseQty}
      onDecrease={decreaseQty}
      onRemove={removeItem}
    />
  );

  const renderEmptyComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyEmoji}>🍔</Text>
      <Text style={styles.emptyTitle}>Your cart is empty</Text>
      <Text style={styles.emptySubtitle}>Add some delicious items from our menu</Text>
      <TouchableOpacity
        style={styles.browseButton}
        onPress={() => navigation.navigate('Menu')}
        activeOpacity={0.8}
      >
        <Text style={styles.browseButtonText}>Browse Menu</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Cart</Text>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(i) => i.id}
        ListEmptyComponent={renderEmptyComponent}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
      {items.length > 0 && (
        <View style={styles.totalContainer}>
          <PriceSummaryRow
            label="Subtotal:"
            value={`$${total.toFixed(2)}`}
          />
          <PriceSummaryRow
            label="Tax (10%):"
            value={`$${(total * 0.1).toFixed(2)}`}
          />
          <PriceSummaryRow
            label="Total:"
            value={`$${(total * 1.1).toFixed(2)}`}
            isTotal
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  listContent: {
    flexGrow: 1,
    paddingBottom: 16,
  },
  totalContainer: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginTop: 8,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
    textAlign: 'center',
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
    textAlign: 'center',
  },
  browseButton: {
    backgroundColor: '#ff6b6b',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 8,
  },
  browseButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});