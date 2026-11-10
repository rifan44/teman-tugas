import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  StyleSheet,
} from 'react-native';

import { COLORS, RADIUS } from '../styles/theme';
import { getTodayString } from '../utils/dateUtils';

export default function TaskForm({
  onSubmit,
  onCancel,
}) {
  const [title, setTitle] = useState('');
  const [course, setCourse] = useState('');
  const [dueDate, setDueDate] = useState(getTodayString());
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  function handleSubmit() {
    const cleanTitle = title.trim();

    if (!cleanTitle) {
      setError('Nama tugas wajib diisi.');
      return;
    }

    const datePattern = /^\d{4}-\d{2}-\d{2}$/;
    const parsedDate = new Date(`${dueDate}T00:00:00`);

    if (
      !datePattern.test(dueDate) ||
      Number.isNaN(parsedDate.getTime()) ||
      (parsedDate.getFullYear() !== Number(dueDate.slice(0, 4)) || parsedDate.getMonth() !== Number(dueDate.slice(5, 7)) - 1 || parsedDate.getDate() !== Number(dueDate.slice(8, 10)))
    ) {
      setError('Format deadline harus valid: YYYY-MM-DD.');
      return;
    }

    setError('');

    onSubmit({
      title: cleanTitle,
      course,
      dueDate,
      description,
    });

    setTitle('');
    setCourse('');
    setDueDate(getTodayString());
    setDescription('');
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Buat Tugas Baru</Text>
      <Text style={styles.helper}>
        Isi informasi tugas kuliahmu di bawah ini.
      </Text>

      <Text style={styles.label}>Nama Tugas *</Text>
      <TextInput
        value={title}
        onChangeText={setTitle}
        placeholder="Contoh: Membuat laporan praktikum"
        placeholderTextColor={COLORS.textSecondary}
        style={styles.input}
        maxLength={100}
      />

      <Text style={styles.label}>Mata Kuliah</Text>
      <TextInput
        value={course}
        onChangeText={setCourse}
        placeholder="Contoh: Mobile Programming"
        placeholderTextColor={COLORS.textSecondary}
        style={styles.input}
        maxLength={60}
      />

      <Text style={styles.label}>Deadline *</Text>
      <TextInput
        value={dueDate}
        onChangeText={setDueDate}
        placeholder="YYYY-MM-DD"
        placeholderTextColor={COLORS.textSecondary}
        style={styles.input}
        keyboardType="numbers-and-punctuation"
        maxLength={10}
      />
      <Text style={styles.fieldHint}>
        Gunakan format tahun-bulan-tanggal, misalnya 2026-11-17.
      </Text>

      <Text style={styles.label}>Deskripsi (Opsional)</Text>
      <TextInput
        value={description}
        onChangeText={setDescription}
        placeholder="Detail tambahan mengenai tugas..."
        placeholderTextColor={COLORS.textSecondary}
        style={[styles.input, styles.textArea]}
        multiline
        textAlignVertical="top"
        maxLength={300}
      />

      {error ? (
        <Text style={styles.error}>{error}</Text>
      ) : null}

      <View style={styles.actions}>
        <Pressable
          onPress={onCancel}
          style={({ pressed }) => [
            styles.cancelButton,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.cancelText}>Batal</Text>
        </Pressable>

        <Pressable
          onPress={handleSubmit}
          style={({ pressed }) => [
            styles.submitButton,
            pressed && styles.pressed,
          ]}
        >
          <Text style={styles.submitText}>Simpan Tugas</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    borderRadius: RADIUS.md,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.border,
    marginBottom: 20,
  },
  heading: {
    color: COLORS.text,
    fontSize: 18,
    fontWeight: '800',
  },
  helper: {
    color: COLORS.textSecondary,
    fontSize: 12,
    marginTop: 5,
    marginBottom: 18,
  },
  label: {
    color: COLORS.text,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 7,
    marginTop: 12,
  },
  input: {
    backgroundColor: COLORS.background,
    color: COLORS.text,
    borderColor: COLORS.border,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 13,
    paddingVertical: 12,
    fontSize: 13,
  },
  textArea: {
    minHeight: 85,
  },
  fieldHint: {
    fontSize: 10,
    color: COLORS.textSecondary,
    marginTop: 5,
  },
  error: {
    color: COLORS.danger,
    fontSize: 12,
    marginTop: 12,
    fontWeight: '600',
  },
  actions: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 20,
  },
  cancelButton: {
    flex: 1,
    borderRadius: 10,
    padding: 13,
    alignItems: 'center',
    backgroundColor: COLORS.background,
  },
  submitButton: {
    flex: 1.5,
    borderRadius: 10,
    padding: 13,
    alignItems: 'center',
    backgroundColor: COLORS.primary,
  },
  cancelText: {
    color: COLORS.textSecondary,
    fontWeight: '800',
    fontSize: 12,
  },
  submitText: {
    color: COLORS.white,
    fontWeight: '800',
    fontSize: 12,
  },
  pressed: {
    opacity: 0.7,
  },
});

