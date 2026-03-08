import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
  label: string;
  value: string;
  isTotal?: boolean;
};

export default function PriceSummaryRow({ label, value, isTotal }: Props) {
  return (
    <View style={styles.row}>
      <Text style={isTotal ? styles.totalLabel : styles.label}>
        {label}
      </Text>
      <Text style={isTotal ? styles.totalValue : styles.value}>
        {value}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
  },
  label: {
    fontSize: 16,
    color: '#333',
  },
  value: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  totalLabel: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ff6b6b',
  },
});
