import { Ionicons } from '@expo/vector-icons';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Badge, Button, Card, Chip } from '../../components/ui';
import { useAuth } from '../../contexts/AuthContext';
import { findArena } from '../../data/arenas';
import { PLAYER_OPTIONS, TIME_SLOTS } from '../../data/slots';
import { supabase } from '../../lib/supabase';
import { colors, radius, spacing } from '../../lib/theme';

function toDateKey(d: Date): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function nextDays(count: number): Date[] {
  const out: Date[] = [];
  const today = new Date();
  for (let i = 0; i < count; i++) {
    const d = new Date(today);
    d.setDate(today.getDate() + i);
    out.push(d);
  }
  return out;
}

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTH_NAMES = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

export default function ArenaDetail() {
  const { name } = useLocalSearchParams<{ name: string }>();
  const arena = findArena(String(name));
  const { user } = useAuth();

  const days = useMemo(() => nextDays(14), []);
  const [date, setDate] = useState<Date>(days[0]);
  const [slot, setSlot] = useState<string | null>(null);
  const [players, setPlayers] = useState<number>(4);
  const [submitting, setSubmitting] = useState(false);

  if (!arena) {
    return (
      <View style={styles.center}>
        <Text style={{ color: colors.mutedForeground }}>Court not found.</Text>
      </View>
    );
  }

  const book = async () => {
    if (!user) return;
    if (!slot) {
      Alert.alert('Missing information', 'Please select a time slot.');
      return;
    }
    setSubmitting(true);
    try {
      // Same insert shape as the PaddlesPK web app.
      const { error } = await supabase.from('bookings').insert({
        user_id: user.id,
        arena_name: arena.name,
        date: toDateKey(date),
        time_slot: slot,
        players,
        status: 'confirmed',
      });
      if (error) throw error;
      Alert.alert(
        'Booking confirmed! 🎾',
        `${arena.name}\n${toDateKey(date)} · ${slot} · ${players} player${players > 1 ? 's' : ''}`,
        [
          {
            text: 'View my bookings',
            onPress: () => router.replace('/(tabs)/bookings'),
          },
          { text: 'Done', onPress: () => router.back() },
        ]
      );
    } catch (e: any) {
      Alert.alert(
        'Booking failed',
        e?.message || 'Something went wrong. Please try again.'
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <ScrollView
      style={{ flex: 1, backgroundColor: colors.background }}
      contentContainerStyle={{ paddingBottom: spacing.xl }}
    >
      <Image source={{ uri: arena.image }} style={styles.hero} />
      <View style={{ padding: spacing.md, gap: spacing.md }}>
        <View>
          <View style={styles.rowBetween}>
            <Text style={styles.title}>{arena.name}</Text>
            <Badge
              label={arena.indoor ? 'Indoor' : 'Outdoor'}
              color={arena.indoor ? colors.accent : colors.primary}
            />
          </View>
          <View style={styles.row}>
            <Ionicons name="location" size={14} color={colors.muted} />
            <Text style={styles.meta}>
              {arena.location} · {arena.courtType} · {arena.surface}
            </Text>
          </View>
          <Text style={styles.price}>
            {arena.price}
            <Text style={styles.perHour}>/hour</Text>
          </Text>
        </View>

        <Card>
          <Text style={styles.sectionTitle}>Facilities</Text>
          <View style={styles.facilities}>
            {arena.facilities.map((f) => (
              <View key={f} style={styles.facility}>
                <Ionicons name="checkmark-circle" size={14} color={colors.accent} />
                <Text style={styles.facilityText}>{f}</Text>
              </View>
            ))}
          </View>
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>Select date</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: spacing.sm }}
          >
            {days.map((d) => {
              const selected = toDateKey(d) === toDateKey(date);
              return (
                <View key={toDateKey(d)}>
                  <DayCell date={d} selected={selected} onPress={() => setDate(d)} />
                </View>
              );
            })}
          </ScrollView>
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>Select time slot</Text>
          <View style={styles.slotGrid}>
            {TIME_SLOTS.map((s) => (
              <Chip
                key={s}
                label={s}
                selected={slot === s}
                onPress={() => setSlot(s)}
              />
            ))}
          </View>
        </Card>

        <Card>
          <Text style={styles.sectionTitle}>Players</Text>
          <View style={{ flexDirection: 'row', gap: spacing.sm }}>
            {PLAYER_OPTIONS.map((p) => (
              <Chip
                key={p}
                label={String(p)}
                selected={players === p}
                onPress={() => setPlayers(p)}
              />
            ))}
          </View>
        </Card>

        <Button
          title={`Confirm Booking — ${arena.price}`}
          onPress={book}
          loading={submitting}
        />
      </View>
    </ScrollView>
  );
}

function DayCell({
  date,
  selected,
  onPress,
}: {
  date: Date;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Text
      onPress={onPress}
      style={[styles.dayCell, selected && styles.dayCellSelected]}
    >
      {DAY_NAMES[date.getDay()]}
      {'\n'}
      <Text style={styles.dayNum}>{date.getDate()}</Text>
      {'\n'}
      {MONTH_NAMES[date.getMonth()]}
    </Text>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.background,
  },
  hero: { width: '100%', height: 200, backgroundColor: colors.input },
  row: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4 },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: { color: colors.foreground, fontSize: 22, fontWeight: '800', flex: 1 },
  meta: { color: colors.mutedForeground, fontSize: 13 },
  price: {
    color: colors.primary,
    fontSize: 20,
    fontWeight: '800',
    marginTop: spacing.sm,
  },
  perHour: { color: colors.muted, fontSize: 13, fontWeight: '500' },
  sectionTitle: {
    color: colors.foreground,
    fontSize: 15,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  facilities: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  facility: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.input,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radius.full,
  },
  facilityText: { color: colors.mutedForeground, fontSize: 12 },
  slotGrid: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.sm },
  dayCell: {
    width: 60,
    textAlign: 'center',
    color: colors.mutedForeground,
    backgroundColor: colors.input,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 10,
    fontSize: 12,
    overflow: 'hidden',
  },
  dayCellSelected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    color: colors.primaryForeground,
    fontWeight: '700',
  },
  dayNum: { fontSize: 18, fontWeight: '800' },
});
