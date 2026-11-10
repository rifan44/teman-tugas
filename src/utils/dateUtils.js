export function getTodayString() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

export function formatDate(dateString) {
  if (!dateString) return 'Belum ditentukan';

  const parts = dateString.split('-');

  if (parts.length !== 3) return dateString;

  const [year, month, day] = parts.map(Number);
  const date = new Date(year, month - 1, day);

  if (Number.isNaN(date.getTime())) return dateString;

  return new Intl.DateTimeFormat('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date);
}

export function isOverdue(task) {
  return (
    !task.completed &&
    Boolean(task.dueDate) &&
    task.dueDate < getTodayString()
  );
}
