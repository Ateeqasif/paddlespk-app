import { Redirect, Stack } from 'expo-router';
import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { colors } from '../../lib/theme';

export default function AuthLayout() {
  const { session, loading } = useAuth();
  if (!loading && session) return <Redirect href="/(tabs)" />;

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: colors.background },
      }}
    />
  );
}
