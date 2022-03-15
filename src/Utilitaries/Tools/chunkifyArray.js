export default function chunkifyArray(a, n, balanced) {
  if (n < a) {
    return [a];
  }

  let len = a.length;
  let out = [];
  let i = 0;
  let size;

  if (len % n === 0) {
    size = Math.floor(len / n);
    while (i < len) {
      out.push(a.slice(i, (i += size)));
    }
  } else if (balanced) {
    while (i < len) {
      size = Math.ceil((len - i) / n--);
      out.push(a.slice(i, (i += size)));
    }
  } else {
    n--;
    size = Math.floor(len / n);
    if (len % size === 0) {
      size--;
      while (i < size * n) {
        out.push(a.slice(i, (i += size)));
      }
      out.push(a.slice(size * n));
    }
  }
  return out;
};