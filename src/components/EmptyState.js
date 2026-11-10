import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { COLORS } from '../styles/theme';

export default function EmptyState({
  title = 'Belum ada tugas',
  description = 'Tambahkan tugas pertamamu untuk mulai mengatur aktivitas kuliah.',
}) {
  return (
    <View style={styles.container}>
      <Text style={styles.icon}>📚</Text>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 36,
    paddingHorizontal: 24,
  },
  icon: {
    fontSize: 42,
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.text,
  },
  description: {
    fontSize: 13,
    color: COLORS.textSecondary,
    textAlign: 'center',
    lineHeight: 21,
    marginTop: 7,
  },
});
