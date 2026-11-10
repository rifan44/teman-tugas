import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { TaskProvider } from './src/context/TaskContext';
import AppNavigator from './src/navigation/AppNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <TaskProvider>
        <NavigationContainer>
          <StatusBar style="dark" backgroundColor="#F5F7FC" />
          <AppNavigator />
        </NavigationContainer>
      </TaskProvider>
    </SafeAreaProvider>
  );
}
