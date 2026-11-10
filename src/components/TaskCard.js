import React from 'react';
import {
  View,
  Text,
  Pressable,
  StyleSheet,
  Alert,
} from 'react-native';

import { COLORS, RADIUS } from '../styles/theme';
import { formatDate, isOverdue } from '../utils/dateUtils';

export default function TaskCard({
  task,
  onToggle,
  onDelete,
}) {
  const overdue = isOverdue(task);

  function confirmDelete() {
    Alert.alert(
      'Hapus tugas',
      `Apakah kamu yakin ingin menghapus "${task.title}"?`,
      [
        { text: 'Batal', style: 'cancel' },
        {
          text: 'Hapus',
          style: 'destructive',
          onPress: () => onDelete(task.id),
        },
      ]
    );
  }

  return (
    <View
      style={[
        styles.card,
        task.completed && styles.completedCard,
      ]}
    >
      <View style={styles.topRow}>
        <View style={styles.courseContainer}>
          <Text style={styles.course} numberOfLines={1}>
            {task.course}
          </Text>
        </View>

        <View
          style={[
            styles.badge,
            task.completed
              ? styles.successBadge
              : overdue
                ? styles.dangerBadge
                : styles.pendingBadge,
          ]}
        >
          <Text
            style={[
              styles.badgeText,
              task.completed
                ? styles.successText
                : overdue
                  ? styles.dangerText
                  : styles.pendingText,
            ]}
          >
            {task.completed
              ? 'Selesai'
              : overdue
                ? 'Terlambat'
                : 'Berjalan'}
          </Text>
        </View>
      </View>

      <Text
        style={[
          styles.title,
          task.completed && styles.completedTitle,
        ]}
      >
        {task.title}
      </Text>

      {task.description ? (
        <Text style={styles.description} numberOfLines={2}>
          {task.description}
        </Text>
      ) : null}

      <View style={styles.footer}>
        <Text
          style={[
            styles.deadline,
            overdue && styles.overdueDeadline,
          ]}
        >
          📅 {formatDate(task.dueDate)}
        </Text>

        <View style={styles.actions}>
          <Pressable
            onPress={() => onToggle(task.id)}
            style={({ pressed }) => [
              styles.actionButton,
              task.completed
                ? styles.undoButton
                : styles.completeButton,
              pressed && styles.pressed,
            ]}
          >
            <Text
              style={[
                styles.actionText,
                task.completed
                  ? styles.undoText
                  : styles.completeText,
              ]}
            >
              {task.completed ? 'Batalkan' : 'Selesaikan'}
            </Text>
          </Pressable>

          <Pressable
            onPress={confirmDelete}
            style={({ pressed }) => [
              styles.deleteButton,
              pressed && styles.pressed,
            ]}
            accessibilityLabel={`Hapus tugas ${task.title}`}
          >
            <Text style={styles.deleteText}>Hapus</Text>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: RADIUS.md,
    padding: 16,
    marginBottom: 12,
  },
  completedCard: {
    backgroundColor: '#FAFCFB',
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  courseContainer: {
    flex: 1,
    marginRight: 10,
  },
  course: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '800',
  },
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: RADIUS.pill,
  },
  successBadge: {
    backgroundColor: COLORS.successLight,
  },
  pendingBadge: {
    backgroundColor: COLORS.primaryLight,
  },
  dangerBadge: {
    backgroundColor: COLORS.dangerLight,
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '800',
  },
  successText: {
    color: COLORS.success,
  },
  pendingText: {
    color: COLORS.primary,
  },
  dangerText: {
    color: COLORS.danger,
  },
  title: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '800',
    marginTop: 12,
    lineHeight: 22,
  },
  completedTitle: {
    color: COLORS.textSecondary,
    textDecorationLine: 'line-through',
  },
  description: {
    color: COLORS.textSecondary,
    fontSize: 12,
    lineHeight: 19,
    marginTop: 5,
  },
  footer: {
    marginTop: 15,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: COLORS.border,
  },
  deadline: {
    fontSize: 11,
    fontWeight: '600',
    color: COLORS.textSecondary,
  },
  overdueDeadline: {
    color: COLORS.danger,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
    gap: 8,
  },
  actionButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    borderRadius: 10,
  },
  completeButton: {
    backgroundColor: COLORS.primary,
  },
  undoButton: {
    backgroundColor: COLORS.successLight,
  },
  actionText: {
    fontSize: 12,
    fontWeight: '800',
  },
  completeText: {
    color: COLORS.white,
  },
  undoText: {
    color: COLORS.success,
  },
  deleteButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: COLORS.dangerLight,
  },
  deleteText: {
    color: COLORS.danger,
    fontSize: 12,
    fontWeight: '800',
  },
  pressed: {
    opacity: 0.7,
  },
});
