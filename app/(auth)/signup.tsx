import { Link, router } from 'expo-router';
import React, { useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, Input } from '../../components/ui';
import { useAuth } from '../../contexts/AuthContext';
import { colors, spacing } from '../../lib/theme';

export default function SignUp() {
  const { signUp } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async () => {
    if (!name.trim() || !email.trim() || !password) {
      setError('Please fill in all fields.');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }
    setError(null);
    setSubmitting(true);
    const { error: err } = await signUp(name, email, password);
    setSubmitting(false);
    if (err) {
      setError(err);
    } else {
      Alert.alert(
        'Account created',
        'If email confirmation is enabled you may need to verify your email before signing in.'
      );
      router.replace('/(tabs)');
    }
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.brand}>
            <Text style={styles.brandTitle}>
              Paddles<Text style={{ color: colors.primary }}>PK</Text>
            </Text>
            <Text style={styles.tagline}>YOUR GAME PRIME</Text>
          </View>

          <Text style={styles.heading}>Create your account</Text>
          <Text style={styles.sub}>
            Join Pakistan&apos;s premier padel community.
          </Text>

          <View style={{ gap: spacing.md, marginTop: spacing.lg }}>
            <Input
              label="Full name"
              value={name}
              onChangeText={setName}
              placeholder="Your name"
              autoComplete="name"
            />
            <Input
              label="Email"
              value={email}
              onChangeText={setEmail}
              placeholder="you@example.com"
              autoCapitalize="none"
              keyboardType="email-address"
              autoComplete="email"
            />
            <Input
              label="Password"
              value={password}
              onChangeText={setPassword}
              placeholder="Min. 6 characters"
              secureTextEntry
            />
            {error ? <Text style={styles.error}>{error}</Text> : null}
            <Button
              title="Create Account"
              onPress={onSubmit}
              loading={submitting}
            />
          </View>

          <View style={styles.footer}>
            <Text style={{ color: colors.mutedForeground }}>
              Already have an account?{' '}
            </Text>
            <Link href="/(auth)/signin" style={styles.link}>
              Sign in
            </Link>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  container: { flexGrow: 1, justifyContent: 'center', padding: spacing.lg },
  brand: { alignItems: 'center', marginBottom: spacing.xl },
  brandTitle: { color: colors.foreground, fontSize: 36, fontWeight: '800' },
  tagline: {
    color: colors.muted,
    fontSize: 11,
    letterSpacing: 3,
    marginTop: 4,
    fontWeight: '600',
  },
  heading: { color: colors.foreground, fontSize: 24, fontWeight: '800' },
  sub: { color: colors.mutedForeground, marginTop: 4 },
  error: { color: colors.destructive, fontSize: 13 },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: spacing.xl,
  },
  link: { color: colors.primary, fontWeight: '700' },
});
