export function intToColor(id) {
    // Simple hashing function to map an integer to a color
    const hash = (id * 2654435761) % (2 ** 32); // Knuth's multiplicative hash
    const color = '#' + ('00000' + (hash & 0xFFFFFF).toString(16)).slice(-6); // Extract RGB components
    return color;
  }