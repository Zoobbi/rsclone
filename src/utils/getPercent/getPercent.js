export default function getPercent(value, total) {
  if (total !== 0) {
    return ((value / total) * 100).toFixed();
  }
  return 0;
}
