import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import React, { useCallback, useState } from 'react';
import {
  Alert,
  FlatList,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Badge, Button, Card } from '../../components/ui';
import { useAuth } from '../../contexts/AuthContext';
import { supabase } from '../../lib/supabase';
import { colors, spacing } from '../../lib/theme';

type Booking = {
  id: string;
  arena_name: string;
  date: string;
  time_slot: string;
  players: number;
  status: 'confirmed' | 'pending' | 'cancelled';
  created_at: string;
};

const STATUS_COLORS: Record<Booking['status'], string> = {
  confirmed: colors.accent,
  pending: colors.primary,
  cancelled: colors.destructive,
};

export default function MyBookings() {
  const { user } = useAuth();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!user) return;
    try {
      const { data } = await supabase
        .from('bookings')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false });
      setBookings((data as Booking[]) || []);
    } catch {
      setBookings([]);
    } finally {
      setLoading(false);
    }
  }, [user]);

  useFocusEffect(
    useCallback(() => {
      load();
    }, [load])
  );

  const cancel = (id: string) => {
    Alert.alert('Cancel booking', 'Are you sure you want to cancel this booking?', [
      { text: 'Keep it', style: 'cancel' },
      {
        text: 'Cancel booking',
        style: 'destructive',
        onPress: async () => {
          try {
            await supabase
              .from('bookings')
              .update({ status: 'cancelled' })
              .eq('id', id);
            setBookings((prev) =>
              prev.map((b) => (b.id === id ? { ...b, status: 'cancelled' } : b))
            );
          } catch (e) {
            console.error(e);
          }
        },
      },
    ]);
  };

  return (
    <FlatList
      style={{ flex: 1, backgroundColor: colors.background }}
      data={bookings}
      keyExtractor={(b) => String(b.id)}
      contentContainerStyle={{ padding: spacing.md, gap: spacing.md, flexGrow: 1 }}
      refreshControl={
        <RefreshControl
          refreshing={loading}
          onRefresh={load}
          tintColor={colors.primary}
        />
      }
      renderItem={({ item }) => (
        <Card>
          <View style={styles.rowBetween}>
            <Text style={styles.arena}>{item.arena_name}</Text>
            <Badge label={item.status} color={STATUS_COLORS[item.status]} />
          </View>
          <View style={styles.metaRow}>
            <View style={styles.meta}>
              <Ionicons name="calendar-outline" size={14} color={colors.muted} />
              <Text style={styles.metaText}>{item.date}</Text>
            </View>
            <View style={styles.meta}>
              <Ionicons name="time-outline" size={14} color={colors.muted} />
              <Text style={styles.metaText}>{item.time_slot}</Text>
            </View>
            <View style={styles.meta}>
              <Ionicons name="people-outline" size={14} color={colors.muted} />
              <Text style={styles.metaText}>{item.players}</Text>
            </View>
          </View>
          {item.status === 'confirmed' ? (
            <Button
              title="Cancel Booking"
              variant="outline"
              onPress={() => cancel(item.id)}
              style={{ marginTop: spacing.md, height: 40 }}
            />
          ) : null}
        </Card>
      )}
      ListEmptyComponent={
        loading ? null : (
          <View style={styles.empty}>
            <Ionicons name="calendar-outline" size={48} color={colors.muted} />
            <Text style={styles.emptyTitle}>No bookings yet</Text>
            <Text style={styles.emptyText}>
              Browse courts and book your first game.
            </Text>
          </View>
        )
      }
    />
  );
}

const styles = StyleSheet.create({
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  arena: { color: colors.foreground, fontSize: 16, fontWeight: '800', flex: 1 },
  metaRow: {
    flexDirection: 'row',
    gap: spacing.md,
    marginTop: spacing.sm,
    flexWrap: 'wrap',
  },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  metaText: { color: colors.mutedForeground, fontSize: 13 },
  empty: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
  },
  emptyTitle: { color: colors.foreground, fontSize: 17, fontWeight: '700' },
  emptyText: { color: colors.mutedForeground, fontSize: 13 },
});
