import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  console.log('App.tsx is loading!');
  return (
    <NavigationContainer>
      <AppNavigator />
    </NavigationContainer>
  );
}