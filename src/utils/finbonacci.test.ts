import { describe, it, expect } from 'vitest';
import { fibonacci } from './fibonacci';

describe('fibonacci', () => {
  it('should return 0 when num is 0', () => {
    expect(fibonacci(0)).toBe(0);
  });
  it('should return 1 when num is 1', () => {
    expect(fibonacci(1)).toBe(1);
  });

  // 添加一个边界情况测试用例和异常情况测试用例
  it('should throw an error when num is negative', () => {
    expect(() => fibonacci(-1)).toThrow('Input must be a non-negative integer');
  });
  it('should throw an error when num is not a number', () => {
    expect(() => fibonacci('1' as unknown as number)).toThrow('Input must be a non-negative integer');
  });
});
