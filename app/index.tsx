import { Stack } from 'expo-router';
import React from 'react';
import { Text } from 'react-native';

export default function Home() {
  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <Text>Hello</Text>
    </>
  );
}
