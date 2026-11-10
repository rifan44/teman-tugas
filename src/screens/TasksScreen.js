import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import useTasks from '../hooks/useTasks';
import TaskCard from '../components/TaskCard';
import TaskForm from '../components/TaskForm';
import EmptyState from '../components/EmptyState';
import { COLORS, RADIUS } from '../styles/theme';

const FILTERS = ['Semua', 'Berjalan', 'Selesai'];

export default function TasksScreen() {
  const {
    sortedTasks,
    stats,
    isReady,
    addTask,
    toggleTask,
    deleteTask,
  } = useTasks();

  const [filter, setFilter] = useState('Semua');
  const [showForm, setShowForm] = useState(false);

  const filteredTasks = useMemo(() => {
    if (filter === 'Berjalan') {
      return sortedTasks.filter((task) => !task.completed);
    }

    if (filter === 'Selesai') {
      return sortedTasks.filter((task) => task.completed);
    }

    return sortedTasks;
  }, [sortedTasks, filter]);

  function handleAddTask(taskData) {
    addTask(taskData);
    setShowForm(false);
    setFilter('Semua');
  }

  if (!isReady) {
    return (
      <SafeAreaView style={styles.loading}>
        <Text style={styles.loadingText}>Memuat tugas...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={['bottom', 'left', 'right']}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <View style={styles.headerText}>
            <Text style={styles.title}>Daftar Tugas</Text>
            <Text style={styles.subtitle}>
              Kelola semua aktivitas perkuliahanmu.
            </Text>
          </View>

          <Pressable
            onPress={() => setShowForm((current) => !current)}
            style={({ pressed }) => [
              styles.addButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.addButtonText}>
              {showForm ? 'Tutup' : '+ Tambah'}
            </Text>
          </Pressable>
        </View>

        {showForm ? (
          <TaskForm
            onSubmit={handleAddTask}
            onCancel={() => setShowForm(false)}
          />
        ) : null}

        <View style={styles.summary}>
          <Text style={styles.summaryText}>
            Total {stats.total} tugas
          </Text>
          <Text style={styles.summaryDetail}>
            {stats.completed} selesai · {stats.pending} berjalan
          </Text>
        </View>

        <View style={styles.filters}>
          {FILTERS.map((item) => {
            const active = filter === item;

            return (
              <Pressable
                key={item}
                onPress={() => setFilter(item)}
                style={[
                  styles.filterButton,
                  active && styles.activeFilter,
                ]}
              >
                <Text
                  style={[
                    styles.filterText,
                    active && styles.activeFilterText,
                  ]}
                >
                  {item}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.listHeader}>
          <Text style={styles.listTitle}>Daftar Aktivitas</Text>
          <Text style={styles.listCount}>
            {filteredTasks.length} tugas
          </Text>
        </View>

        {filteredTasks.length === 0 ? (
          <View style={styles.emptyCard}>
            <EmptyState
              title={
                filter === 'Selesai'
                  ? 'Belum ada tugas selesai'
                  : filter === 'Berjalan'
                    ? 'Tidak ada tugas berjalan'
                    : 'Belum ada tugas'
              }
              description={
                filter === 'Semua'
                  ? 'Tekan tombol Tambah untuk memasukkan tugas kuliah pertamamu.'
                  : 'Tugas dengan kategori ini belum tersedia.'
              }
            />
          </View>
        ) : (
          filteredTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          ))
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.background,
  },
  loadingText: {
    color: COLORS.textSecondary,
  },
  container: {
    padding: 18,
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 22,
  },
  headerText: {
    flex: 1,
    marginRight: 10,
  },
  title: {
    color: COLORS.text,
    fontSize: 23,
    fontWeight: '900',
  },
  subtitle: {
    color: COLORS.textSecondary,
    fontSize: 11,
    marginTop: 5,
  },
  addButton: {
    paddingHorizontal: 13,
    paddingVertical: 11,
    backgroundColor: COLORS.primary,
    borderRadius: 10,
  },
  addButtonText: {
    color: COLORS.white,
    fontSize: 11,
    fontWeight: '900',
  },
  summary: {
    backgroundColor: COLORS.primaryLight,
    padding: 15,
    borderRadius: RADIUS.md,
    marginBottom: 16,
  },
  summaryText: {
    fontSize: 16,
    color: COLORS.primary,
    fontWeight: '900',
  },
  summaryDetail: {
    fontSize: 11,
    color: COLORS.textSecondary,
    marginTop: 5,
  },
  filters: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 23,
  },
  filterButton: {
    paddingVertical: 9,
    paddingHorizontal: 15,
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.pill,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  activeFilter: {
    backgroundColor: COLORS.primary,
    borderColor: COLORS.primary,
  },
  filterText: {
    fontSize: 11,
    color: COLORS.textSecondary,
    fontWeight: '700',
  },
  activeFilterText: {
    color: COLORS.white,
  },
  listHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  listTitle: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.text,
  },
  listCount: {
    fontSize: 11,
    color: COLORS.textSecondary,
  },
  emptyCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  pressed: {
    opacity: 0.7,
  },
});
