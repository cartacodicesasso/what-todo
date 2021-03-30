export function formatDate(date: Date): string {
  return date.toLocaleDateString(window.navigator.language, {
    month: "2-digit",
    day: "2-digit",
  });
}
