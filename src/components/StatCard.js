import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS, RADIUS } from '../styles/theme';

export default function StatCard({
  label,
  value,
  icon,
  accent = COLORS.primary,
}) {
  return (
    <View style={styles.card}>
      <View
        style={[
          styles.iconContainer,
          { backgroundColor: `${accent}18` },
        ]}
      >
        <Text style={styles.icon}>{icon}</Text>
      </View>

      <Text style={styles.value}>{value}</Text>
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    minHeight: 124,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    padding: 12,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  iconContainer: {
    width: 34,
    height: 34,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 17,
  },
  value: {
    marginTop: 8,
    fontSize: 25,
    fontWeight: '800',
    color: COLORS.text,
  },
  label: {
    marginTop: 2,
    fontSize: 11,
    color: COLORS.textSecondary,
    fontWeight: '600',
  },
});
