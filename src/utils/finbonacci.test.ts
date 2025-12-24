import { describe, it, expect } from 'vitest';
import { fibonacci } from './fibonacci';

describe('fibonacci', () => {
  it('should return 0 when num is 0', () => {
    expect(fibonacci(0)).toBe(0);
  });
  it('should return 1 when num is 1', () => {
    expect(fibonacci(1)).toBe(1);
  });

  // 测试递归调用（n > 1 的情况）
  it('should return correct value for n > 1', () => {
    expect(fibonacci(2)).toBe(1);  // fibonacci(1) + fibonacci(0) = 1 + 0 = 1
    expect(fibonacci(3)).toBe(2);  // fibonacci(2) + fibonacci(1) = 1 + 1 = 2
    expect(fibonacci(4)).toBe(3);  // fibonacci(3) + fibonacci(2) = 2 + 1 = 3
    expect(fibonacci(5)).toBe(5);  // fibonacci(4) + fibonacci(3) = 3 + 2 = 5
    expect(fibonacci(6)).toBe(8);  // fibonacci(5) + fibonacci(4) = 5 + 3 = 8
  });

  // 异常情况测试用例
  it('should throw an error when num is negative', () => {
    expect(() => fibonacci(-1)).toThrow('Input must be a non-negative integer');
  });
  it('should throw an error when num is not a number', () => {
    expect(() => fibonacci('1' as unknown as number)).toThrow('Input must be a non-negative integer');
  });
  it('should throw an error when num is not an integer', () => {
    expect(() => fibonacci(1.5)).toThrow('Input must be a non-negative integer');
    expect(() => fibonacci(2.7)).toThrow('Input must be a non-negative integer');
  });
});
