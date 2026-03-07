import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import CartScreen from '../screens/CartScreen';
import ItemDetailScreen from '../screens/ItemDetailScreen';
import LoginScreen from '../screens/LoginScreen';
import MenuScreen from '../screens/MenuScreen';
import { useCartStore } from '../store/cartStore';
import { MenuStackParamList, RootStackParamList, TabParamList } from '../types';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<TabParamList>();
const MenuStack = createNativeStackNavigator<MenuStackParamList>();

function MenuStackNavigator() {
  return (
    <MenuStack.Navigator>
      <MenuStack.Screen
        name="MenuList"
        component={MenuScreen}
        options={{ headerShown: false }}
      />
      <MenuStack.Screen
        name="ItemDetail"
        component={ItemDetailScreen}
        options={{ title: 'Item Details' }}
      />
    </MenuStack.Navigator>
  );
}

function TabNavigator() {
  const cartItemCount = useCartStore((state) => state.items.length);

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Menu"
        component={MenuStackNavigator}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Cart"
        component={CartScreen}
        options={{
          tabBarBadge: cartItemCount > 0 ? cartItemCount : undefined,
        }}
      />
    </Tab.Navigator>
  );
}

export default function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}