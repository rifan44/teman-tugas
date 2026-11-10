import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomeScreen from '../screens/HomeScreen';
import TasksScreen from '../screens/TasksScreen';
import AboutScreen from '../screens/AboutScreen';
import { COLORS } from '../styles/theme';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.white,
        },
        headerTintColor: COLORS.text,
        headerTitleStyle: {
          fontWeight: '900',
          fontSize: 17,
        },
        headerShadowVisible: false,
        contentStyle: {
          backgroundColor: COLORS.background,
        },
        animation: 'slide_from_right',
      }}
    >
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'TemanTugas',
        }}
      />

      <Stack.Screen
        name="Tasks"
        component={TasksScreen}
        options={{
          title: 'Manajemen Tugas',
        }}
      />

      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{
          title: 'Tentang Aplikasi',
        }}
      />
    </Stack.Navigator>
  );
}
