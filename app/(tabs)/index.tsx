import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useMemo, useState } from 'react';
import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Badge, Chip, Input } from '../../components/ui';
import { arenas, Arena, CITIES } from '../../data/arenas';
import { colors, radius, spacing } from '../../lib/theme';

export default function Courts() {
  const [city, setCity] = useState<(typeof CITIES)[number]>('All');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return arenas.filter((a) => {
      const cityOk = city === 'All' || a.location === city;
      const q = query.trim().toLowerCase();
      const queryOk =
        !q ||
        a.name.toLowerCase().includes(q) ||
        a.courtType.toLowerCase().includes(q);
      return cityOk && queryOk;
    });
  }, [city, query]);

  return (
    <View style={styles.container}>
      <View style={{ padding: spacing.md, paddingBottom: 0 }}>
        <Input
          placeholder="Search courts..."
          value={query}
          onChangeText={setQuery}
        />
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{ flexGrow: 0 }}
        contentContainerStyle={styles.chips}
      >
        {CITIES.map((c) => (
          <Chip key={c} label={c} selected={city === c} onPress={() => setCity(c)} />
        ))}
      </ScrollView>
      <FlatList
        data={filtered}
        keyExtractor={(a) => a.name}
        contentContainerStyle={{ padding: spacing.md, gap: spacing.md }}
        renderItem={({ item }) => <ArenaCard arena={item} />}
        ListEmptyComponent={
          <Text style={styles.empty}>No courts match your search.</Text>
        }
      />
    </View>
  );
}

function ArenaCard({ arena }: { arena: Arena }) {
  return (
    <Pressable
      onPress={() =>
        router.push({
          pathname: '/arena/[name]',
          params: { name: arena.name },
        })
      }
      style={({ pressed }) => [styles.card, pressed && { opacity: 0.85 }]}
    >
      <Image source={{ uri: arena.image }} style={styles.image} />
      <View style={{ padding: spacing.md, gap: 6 }}>
        <View style={styles.rowBetween}>
          <Text style={styles.name}>{arena.name}</Text>
          <Badge
            label={arena.indoor ? 'Indoor' : 'Outdoor'}
            color={arena.indoor ? colors.accent : colors.primary}
          />
        </View>
        <View style={styles.row}>
          <Ionicons name="location" size={14} color={colors.muted} />
          <Text style={styles.metaText}>
            {arena.location} · {arena.courtType}
          </Text>
        </View>
        <View style={styles.rowBetween}>
          <Text style={styles.price}>
            {arena.price}
            <Text style={styles.perHour}>/hour</Text>
          </Text>
          <Text style={styles.surface}>{arena.surface}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  chips: {
    gap: spacing.sm,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
  },
  image: { width: '100%', height: 150, backgroundColor: colors.input },
  row: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  rowBetween: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  name: { color: colors.foreground, fontSize: 17, fontWeight: '800', flex: 1 },
  metaText: { color: colors.mutedForeground, fontSize: 13 },
  price: { color: colors.primary, fontSize: 16, fontWeight: '800' },
  perHour: { color: colors.muted, fontSize: 12, fontWeight: '500' },
  surface: { color: colors.muted, fontSize: 12 },
  empty: {
    color: colors.mutedForeground,
    textAlign: 'center',
    marginTop: spacing.xl,
  },
});
