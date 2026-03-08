import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CartItem } from '../types';

type Props = {
  item: CartItem;
};

export default function CheckoutOrderItem({ item }: Props) {
  return (
    <View style={styles.orderItem}>
      <View style={styles.itemInfo}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemQuantity}>x {item.quantity}</Text>
      </View>
      <Text style={styles.itemPrice}>
        ${(item.price * item.quantity).toFixed(2)}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
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
    fontSize: 14,
    color: '#999',
    marginLeft: 8,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
});
