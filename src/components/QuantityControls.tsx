import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

type Props = {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
};

export default function QuantityControls({
  quantity,
  onDecrease,
  onIncrease,
}: Props) {
  return (
    <View style={styles.qtyControls}>
      <TouchableOpacity
        onPress={onDecrease}
        style={styles.qtyButton}
        activeOpacity={0.7}
      >
        <Text style={styles.qtyButtonText}>-</Text>
      </TouchableOpacity>
      <Text style={styles.qtyValue}>{quantity}</Text>
      <TouchableOpacity
        onPress={onIncrease}
        style={styles.qtyButton}
        activeOpacity={0.7}
      >
        <Text style={styles.qtyButtonText}>+</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  qtyControls: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 4,
  },
  qtyButton: {
    width: 28,
    height: 28,
    borderRadius: 4,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  qtyButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  qtyValue: {
    fontSize: 14,
    fontWeight: '600',
    marginHorizontal: 12,
    minWidth: 30,
    textAlign: 'center',
  },
});
