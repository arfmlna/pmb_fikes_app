export function tgl(tgl) {
    const date = new Date(tgl);
    const formatted = date.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
    });
    return formatted
}

export function today(){
  const tgl = new Date().toLocaleDateString('id-ID', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
  return tgl
}

export function year(){
  const tgl = new Date().getFullYear()
  return tgl
}

export function month(){
  const date = new Date();
  const yearMonth = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
  return yearMonth
}

export function getWeekOfYear(date = new Date()) {
  const startOfYear = new Date(date.getFullYear(), 0, 1); // 1 Januari
  const diffInMs = date - startOfYear;
  const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
  const weekNumber = Math.ceil((diffInDays + startOfYear.getDay() + 1) / 7);
  return weekNumber;
}