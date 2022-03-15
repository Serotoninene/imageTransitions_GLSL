export default function lerping(start, end, amt) {
  return (1 - amt) * start + amt * end;
}