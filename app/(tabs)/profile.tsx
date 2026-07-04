import { Ionicons } from '@expo/vector-icons';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Button, Card, Chip, Input } from '../../components/ui';
import { useAuth } from '../../contexts/AuthContext';
import { CITIES } from '../../data/arenas';
import { supabase } from '../../lib/supabase';
import { colors, spacing } from '../../lib/theme';

const SKILL_LEVELS = ['Beginner', 'Intermediate', 'Advanced', 'Pro'] as const;

export default function Profile() {
  const { user, signOut } = useAuth();
  const [name, setName] = useState('');
  const [city, setCity] = useState('');
  const [skillLevel, setSkillLevel] = useState('');
  const [bio, setBio] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const load = useCallback(async () => {
    if (!user) return;
    try {
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .maybeSingle();
      if (data) {
        setName(data.name || '');
        setCity(data.city || '');
        setSkillLevel(data.skill_level || '');
        setBio(data.bio || '');
      }
    } finally {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    load();
  }, [load]);

  const save = async () => {
    if (!user) return;
    if (!name.trim()) {
      Alert.alert('Missing information', 'Please enter your name.');
      return;
    }
    setSaving(true);
    try {
      // Same upsert shape as the web app's profile editor.
      const { error } = await supabase.from('profiles').upsert({
        id: user.id,
        name: name.trim(),
        city,
        skill_level: skillLevel,
        bio: bio.slice(0, 150),
      });
      if (error) throw error;
      Alert.alert('Profile saved');
    } catch (e: any) {
      Alert.alert('Save failed', e?.message || 'Please try again.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1, backgroundColor: colors.background }}
    >
      <ScrollView
        contentContainerStyle={{ padding: spacing.md, gap: spacing.md }}
        keyboardShouldPersistTaps="handled"
      >
        <Card style={styles.header}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={32} color={colors.primary} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.name}>{name || 'Player'}</Text>
            <Text style={styles.email}>{user?.email}</Text>
          </View>
        </Card>

        {loading ? null : (
          <Card style={{ gap: spacing.md }}>
            <Input label="Name" value={name} onChangeText={setName} />

            <View style={{ gap: 6 }}>
              <Text style={styles.label}>City</Text>
              <View style={styles.chipRow}>
                {CITIES.filter((c) => c !== 'All').map((c) => (
                  <Chip
                    key={c}
                    label={c}
                    selected={city === c}
                    onPress={() => setCity(c)}
                  />
                ))}
              </View>
            </View>

            <View style={{ gap: 6 }}>
              <Text style={styles.label}>Skill level</Text>
              <View style={styles.chipRow}>
                {SKILL_LEVELS.map((s) => (
                  <Chip
                    key={s}
                    label={s}
                    selected={skillLevel === s}
                    onPress={() => setSkillLevel(s)}
                  />
                ))}
              </View>
            </View>

            <Input
              label={`Bio (${bio.length}/150)`}
              value={bio}
              onChangeText={(t) => setBio(t.slice(0, 150))}
              multiline
              style={{ height: 80, paddingTop: 12, textAlignVertical: 'top' }}
            />

            <Button title="Save Profile" onPress={save} loading={saving} />
          </Card>
        )}

        <Button title="Sign Out" variant="outline" onPress={signOut} />
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  header: { flexDirection: 'row', alignItems: 'center', gap: spacing.md },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.input,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: { color: colors.foreground, fontSize: 18, fontWeight: '800' },
  email: { color: colors.mutedForeground, fontSize: 13, marginTop: 2 },
  label: { color: colors.mutedForeground, fontSize: 13, fontWeight: '600' },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
});
