export const randomCode = (length: number): string => {
  const chars = "1234567890qwertyuiop[]asdfghjkl;'zxcvbnm,./";
  const code = new Set<string>();

  while (code.size < length) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    code.add(chars[randomIndex]);
  }

  return Array.from(code).join('');
};
