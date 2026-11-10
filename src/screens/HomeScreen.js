import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';

import useTasks from '../hooks/useTasks';
import StatCard from '../components/StatCard';
import TaskCard from '../components/TaskCard';
import EmptyState from '../components/EmptyState';
import { COLORS, RADIUS } from '../styles/theme';

export default function HomeScreen({ navigation }) {
  const {
    sortedTasks,
    stats,
    isReady,
    toggleTask,
    deleteTask,
  } = useTasks();

  const upcomingTasks = sortedTasks
    .filter((task) => !task.completed)
    .slice(0, 3);

  if (!isReady) {
    return (
      <SafeAreaView style={styles.loading}>
        <Text style={styles.loadingText}>
          Memuat data tugas...
        </Text>
      </SafeAreaView>
    );
  }

  const today = new Intl.DateTimeFormat('id-ID', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(new Date());

  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={['bottom', 'left', 'right']}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <Text style={styles.eyebrow}>STUDENT PRODUCTIVITY</Text>
          <Text style={styles.heroTitle}>
            Halo, Mahasiswa!
          </Text>
          <Text style={styles.heroDescription}>
            Atur tugasmu, capai targetmu, dan belajar lebih teratur.
          </Text>
          <Text style={styles.date}>{today}</Text>

          <Pressable
            onPress={() => navigation.navigate('Tasks')}
            style={({ pressed }) => [
              styles.heroButton,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.heroButtonText}>
              + Kelola Tugas
            </Text>
          </Pressable>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Ringkasan Aktivitas</Text>
          <Text style={styles.sectionSubtitle}>
            Statistik tugasmu
          </Text>
        </View>

        <View style={styles.statsRow}>
          <StatCard
            label="Total Tugas"
            value={stats.total}
            icon="📚"
            accent={COLORS.primary}
          />
          <StatCard
            label="Belum Selesai"
            value={stats.pending}
            icon="⏳"
            accent={COLORS.warning}
          />
          <StatCard
            label="Selesai"
            value={stats.completed}
            icon="✓"
            accent={COLORS.success}
          />
        </View>

        <View style={styles.overdueCard}>
          <View style={styles.overdueIcon}>
            <Text style={styles.overdueIconText}>!</Text>
          </View>
          <View style={styles.overdueContent}>
            <Text style={styles.overdueTitle}>
              Tugas melewati deadline
            </Text>
            <Text style={styles.overdueDescription}>
              Periksa tugas yang perlu segera diselesaikan.
            </Text>
          </View>
          <Text style={styles.overdueValue}>{stats.overdue}</Text>
        </View>

        <View style={styles.sectionHeader}>
          <View>
            <Text style={styles.sectionTitle}>Tugas Mendatang</Text>
            <Text style={styles.sectionSubtitle}>
              Maksimal 3 tugas yang belum selesai
            </Text>
          </View>

          <Pressable onPress={() => navigation.navigate('Tasks')}>
            <Text style={styles.link}>Lihat semua</Text>
          </Pressable>
        </View>

        {upcomingTasks.length === 0 ? (
          <View style={styles.emptyCard}>
            <EmptyState
              title="Semua tugas terkendali"
              description="Belum ada tugas yang menunggu. Tambahkan tugas baru saat diperlukan."
            />
          </View>
        ) : (
          upcomingTasks.map((task) => (
            <TaskCard
              key={task.id}
              task={task}
              onToggle={toggleTask}
              onDelete={deleteTask}
            />
          ))
        )}

        <Pressable
          onPress={() => navigation.navigate('About')}
          style={({ pressed }) => [
            styles.aboutButton,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.aboutButtonText}>
            Tentang TemanTugas  →
          </Text>
        </Pressable>
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
  hero: {
    backgroundColor: COLORS.primary,
    padding: 23,
    borderRadius: RADIUS.lg,
    marginBottom: 25,
  },
  eyebrow: {
    color: '#D8E3FF',
    fontSize: 10,
    letterSpacing: 1.5,
    fontWeight: '800',
  },
  heroTitle: {
    color: COLORS.white,
    fontSize: 27,
    fontWeight: '900',
    marginTop: 12,
  },
  heroDescription: {
    color: '#E5EAFF',
    fontSize: 13,
    lineHeight: 21,
    marginTop: 8,
  },
  date: {
    color: '#DFE7FF',
    fontSize: 11,
    fontWeight: '600',
    marginTop: 15,
  },
  heroButton: {
    alignSelf: 'flex-start',
    paddingHorizontal: 17,
    paddingVertical: 11,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    marginTop: 20,
  },
  heroButtonText: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '900',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 13,
    marginTop: 5,
  },
  sectionTitle: {
    color: COLORS.text,
    fontWeight: '900',
    fontSize: 17,
  },
  sectionSubtitle: {
    color: COLORS.textSecondary,
    fontSize: 11,
    marginTop: 4,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 9,
    marginBottom: 14,
  },
  overdueCard: {
    backgroundColor: COLORS.warningLight,
    borderRadius: RADIUS.md,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 27,
  },
  overdueIcon: {
    width: 32,
    height: 32,
    backgroundColor: '#FFE8B7',
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  overdueIconText: {
    color: COLORS.warning,
    fontWeight: '900',
    fontSize: 17,
  },
  overdueContent: {
    flex: 1,
    marginLeft: 10,
  },
  overdueTitle: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: '800',
  },
  overdueDescription: {
    color: COLORS.textSecondary,
    fontSize: 10,
    marginTop: 3,
  },
  overdueValue: {
    color: COLORS.warning,
    fontSize: 22,
    fontWeight: '900',
  },
  link: {
    color: COLORS.primary,
    fontSize: 12,
    fontWeight: '800',
  },
  emptyCard: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  aboutButton: {
    alignItems: 'center',
    padding: 16,
    marginTop: 5,
  },
  aboutButtonText: {
    color: COLORS.primary,
    fontWeight: '800',
    fontSize: 12,
  },
  pressed: {
    opacity: 0.7,
  },
});
