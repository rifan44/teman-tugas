import React, {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { getTodayString } from '../utils/dateUtils';

const TaskContext = createContext(null);
const STORAGE_KEY = '@temantugas/tasks';

export function TaskProvider({ children }) {
  const [tasks, setTasks] = useState([]);
  const [isReady, setIsReady] = useState(false);

  // Load saved tasks when the application starts.
  useEffect(() => {
    async function loadTasks() {
      try {
        const savedTasks = await AsyncStorage.getItem(STORAGE_KEY);

        if (savedTasks) {
          const parsedTasks = JSON.parse(savedTasks);

          if (Array.isArray(parsedTasks)) {
            setTasks(parsedTasks);
          }
        }
      } catch (error) {
        console.warn('Failed to load tasks:', error);
      } finally {
        setIsReady(true);
      }
    }

    loadTasks();
  }, []);

  // Save task changes after initial hydration.
  useEffect(() => {
    if (!isReady) return;

    async function saveTasks() {
      try {
        await AsyncStorage.setItem(
          STORAGE_KEY,
          JSON.stringify(tasks)
        );
      } catch (error) {
        console.warn('Failed to save tasks:', error);
      }
    }

    saveTasks();
  }, [tasks, isReady]);

  const addTask = useCallback((taskData) => {
    const newTask = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      title: taskData.title.trim(),
      course: taskData.course.trim() || 'Umum',
      description: taskData.description?.trim() || '',
      dueDate: taskData.dueDate,
      completed: false,
      createdAt: new Date().toISOString(),
    };

    setTasks((currentTasks) => [newTask, ...currentTasks]);

    return newTask;
  }, []);

  const toggleTask = useCallback((taskId) => {
    setTasks((currentTasks) =>
      currentTasks.map((task) =>
        task.id === taskId
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  }, []);

  const deleteTask = useCallback((taskId) => {
    setTasks((currentTasks) =>
      currentTasks.filter((task) => task.id !== taskId)
    );
  }, []);

  // Sort tasks by their deadlines.
  const sortedTasks = useMemo(() => {
    return [...tasks].sort((a, b) =>
      a.dueDate.localeCompare(b.dueDate)
    );
  }, [tasks]);

  // Calculate dashboard statistics.
  const stats = useMemo(() => {
    const completed = tasks.filter((task) => task.completed).length;
    const pending = tasks.length - completed;
    const overdue = tasks.filter(
      (task) =>
        !task.completed &&
        task.dueDate < getTodayString()
    ).length;

    return {
      total: tasks.length,
      completed,
      pending,
      overdue,
    };
  }, [tasks]);

  const contextValue = useMemo(
    () => ({
      tasks,
      sortedTasks,
      stats,
      isReady,
      addTask,
      toggleTask,
      deleteTask,
    }),
    [
      tasks,
      sortedTasks,
      stats,
      isReady,
      addTask,
      toggleTask,
      deleteTask,
    ]
  );

  return (
    <TaskContext.Provider value={contextValue}>
      {children}
    </TaskContext.Provider>
  );
}

export default TaskContext;
