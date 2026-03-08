import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import QuantityControls from './QuantityControls';
import { CartItem } from '../types';

type Props = {
  item: CartItem;
  onIncrease: (id: string) => void;
  onDecrease: (id: string) => void;
  onRemove: (id: string) => void;
};

export default function CartItemRow({
  item,
  onIncrease,
  onDecrease,
  onRemove,
}: Props) {
  return (
    <View style={styles.itemContainer}>
      <Image source={{ uri: item.image }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemPrice}>${item.price.toFixed(2)}</Text>
        <QuantityControls
          quantity={item.quantity}
          onDecrease={() => onDecrease(item.id)}
          onIncrease={() => onIncrease(item.id)}
        />
        <TouchableOpacity
          onPress={() => onRemove(item.id)}
          style={styles.removeButton}
          activeOpacity={0.7}
        >
          <Text style={styles.removeText}>Remove</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    marginRight: 12,
    backgroundColor: '#e0e0e0',
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 2,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ff6b6b',
    marginBottom: 4,
  },
  removeButton: {
    marginTop: 4,
    paddingVertical: 4,
  },
  removeText: {
    color: '#999',
    fontSize: 12,
    fontWeight: '500',
  },
});
