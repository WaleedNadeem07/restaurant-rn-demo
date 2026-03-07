import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View, ActivityIndicator, Dimensions } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { MenuItem } from '../types';

const { width } = Dimensions.get('window');
const cardWidth = width - 32; // Full width minus padding

interface MenuItemCardProps {
  item: MenuItem;
  onViewPress: (itemId: string) => void;
}

export default function MenuItemCard({ item, onViewPress }: MenuItemCardProps) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  return (
    <TouchableOpacity 
      style={styles.card}
      onPress={() => onViewPress(item.id)}
      activeOpacity={0.7}
    >
      <View style={styles.imageContainer}>
        {imageLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="small" color="#ff6b6b" />
          </View>
        )}
        
        {imageError ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>No image</Text>
          </View>
        ) : (
          <Image 
            source={{ uri: item.image, cache: 'force-cache' }}
            style={styles.image}
            onLoadStart={() => setImageLoading(true)}
            onLoad={() => setImageLoading(false)}
            onError={() => {
              setImageError(true);
              setImageLoading(false);
            }}
            resizeMode="cover"
          />
        )}
      </View>
      
      <View style={styles.content}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
        <View style={styles.buttonContainer}>
          <Text style={styles.buttonText}>View Details</Text>
          <Ionicons name="arrow-forward" size={14} color="#ff6b6b" />
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    height: 140, // Fixed height for consistency
  },
  imageContainer: {
    width: 120,
    height: '100%',
    backgroundColor: '#f0f0f0',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  loadingContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  errorContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  errorText: {
    color: '#999',
    fontSize: 12,
  },
  content: {
    flex: 1,
    padding: 12,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 2,
  },
  price: {
    fontSize: 14,
    fontWeight: '600',
    color: '#ff6b6b',
    marginBottom: 4,
  },
  description: {
    fontSize: 12,
    color: '#666',
    lineHeight: 16,
    flex: 1,
  },
  buttonContainer: {
    marginTop: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ff6b6b',
    fontSize: 12,
    fontWeight: '600',
    marginRight: 4,
  },
});