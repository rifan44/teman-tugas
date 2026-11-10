import React from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, RADIUS } from '../styles/theme';

const FEATURES = [
  {
    icon: '📋',
    title: 'Manajemen Tugas',
    description: 'Mencatat tugas kuliah dan informasi mata kuliah.',
  },
  {
    icon: '📅',
    title: 'Deadline',
    description: 'Memantau tenggat waktu setiap tugas.',
  },
  {
    icon: '📊',
    title: 'Statistik',
    description: 'Melihat jumlah tugas yang selesai dan belum selesai.',
  },
  {
    icon: '💾',
    title: 'Penyimpanan Lokal',
    description: 'Menyimpan data tugas di perangkat menggunakan AsyncStorage.',
  },
];

export default function AboutScreen() {
  return (
    <SafeAreaView
      style={styles.safeArea}
      edges={['bottom', 'left', 'right']}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.hero}>
          <Text style={styles.logo}>TT</Text>
          <Text style={styles.name}>TemanTugas</Text>
          <Text style={styles.version}>Student Task Manager · Versi 1.0.0</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Tentang Aplikasi</Text>
          <Text style={styles.paragraph}>
            TemanTugas adalah aplikasi mobile sederhana yang dirancang
            untuk membantu mahasiswa mengatur aktivitas perkuliahan.
            Pengguna dapat mencatat tugas, menentukan deadline,
            memantau progres, dan mengelola penyelesaian tugas dalam
            satu aplikasi.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Fitur Utama</Text>

          {FEATURES.map((feature) => (
            <View style={styles.feature} key={feature.title}>
              <View style={styles.featureIcon}>
                <Text style={styles.featureEmoji}>{feature.icon}</Text>
              </View>

              <View style={styles.featureContent}>
                <Text style={styles.featureTitle}>
                  {feature.title}
                </Text>
                <Text style={styles.featureDescription}>
                  {feature.description}
                </Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Teknologi</Text>
          <View style={styles.techContainer}>
            {['React Native', 'Expo SDK 54', 'JavaScript', 'React Navigation', 'React Hooks', 'AsyncStorage'].map((item) => (
              <View style={styles.techBadge} key={item}>
                <Text style={styles.techText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerTitle}>
            Dibuat untuk keperluan Ujian Tengah Semester
          </Text>
          <Text style={styles.footerText}>
            Mata Kuliah Teknik Mobile Programming Framework
          </Text>
          <Text style={styles.footerText}>
            Universitas Muhammadiyah Sukabumi
          </Text>
          <Text style={styles.copyright}>
            TemanTugas © 2026
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  container: {
    padding: 18,
    paddingBottom: 35,
  },
  hero: {
    backgroundColor: COLORS.primary,
    alignItems: 'center',
    borderRadius: RADIUS.lg,
    padding: 28,
  },
  logo: {
    backgroundColor: COLORS.white,
    color: COLORS.primary,
    fontSize: 23,
    fontWeight: '900',
    width: 65,
    height: 65,
    borderRadius: 20,
    textAlign: 'center',
    textAlignVertical: 'center',
    overflow: 'hidden',
  },
  name: {
    color: COLORS.white,
    fontSize: 24,
    fontWeight: '900',
    marginTop: 13,
  },
  version: {
    color: '#DEE6FF',
    fontSize: 11,
    marginTop: 5,
  },
  section: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    padding: 18,
    marginTop: 16,
    borderWidth: 1,
    borderColor: COLORS.border,
  },
  heading: {
    color: COLORS.text,
    fontSize: 16,
    fontWeight: '900',
    marginBottom: 13,
  },
  paragraph: {
    color: COLORS.textSecondary,
    fontSize: 12,
    lineHeight: 21,
    textAlign: 'justify',
  },
  feature: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  featureIcon: {
    width: 43,
    height: 43,
    borderRadius: 13,
    backgroundColor: COLORS.primaryLight,
    alignItems: 'center',
    justifyContent: 'center',
  },
  featureEmoji: {
    fontSize: 19,
  },
  featureContent: {
    flex: 1,
    marginLeft: 12,
  },
  featureTitle: {
    color: COLORS.text,
    fontWeight: '800',
    fontSize: 12,
  },
  featureDescription: {
    color: COLORS.textSecondary,
    fontSize: 10,
    lineHeight: 16,
    marginTop: 3,
  },
  techContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  techBadge: {
    backgroundColor: COLORS.primaryLight,
    paddingHorizontal: 11,
    paddingVertical: 8,
    borderRadius: RADIUS.pill,
  },
  techText: {
    color: COLORS.primary,
    fontSize: 10,
    fontWeight: '800',
  },
  footer: {
    alignItems: 'center',
    padding: 22,
  },
  footerTitle: {
    color: COLORS.text,
    fontSize: 11,
    fontWeight: '800',
    textAlign: 'center',
  },
  footerText: {
    color: COLORS.textSecondary,
    fontSize: 10,
    textAlign: 'center',
    marginTop: 5,
  },
  copyright: {
    color: COLORS.primary,
    fontWeight: '800',
    fontSize: 10,
    marginTop: 13,
  },
});
