export const logErr = () => {
  console.log('Input must be a non-negative integer');
}

export function fibonacci(n: number): number {
  if (typeof n !== 'number' || n < 0 || !Number.isInteger(n)) {
    logErr();
    throw new Error('Input must be a non-negative integer');
  }
  if (n <= 1) return n;
  return fibonacci(n - 1) + fibonacci(n - 2);
}
