import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import MenuItemCard from '../components/MenuItemCard';
import { mockMenu } from '../data/mockMenu';
import { MenuItem, MenuStackParamList } from '../types';

type MenuScreenNavigationProp = NativeStackNavigationProp<MenuStackParamList, 'MenuList'>;

export default function MenuScreen() {
  const navigation = useNavigation<MenuScreenNavigationProp>();

  const handleViewPress = (itemId: string) => {
    navigation.navigate('ItemDetail', { itemId });
  };

  const renderItem = ({ item }: { item: MenuItem }) => (
    <MenuItemCard item={item} onViewPress={handleViewPress} />
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Menu</Text>
      <FlatList
        data={mockMenu}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        scrollEnabled={true}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    paddingTop: 16,
    paddingHorizontal: 16,
    marginBottom: 8,
    color: '#333',
  },
  listContent: {
    padding: 16,
    paddingTop: 8,
  },
});