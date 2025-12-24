# 测试覆盖率计算详解 - 以 fibonacci 函数为例

## 当前覆盖率报告

```
File          | % Stmts | % Branch | % Funcs | % Lines | Uncovered Line #s 
--------------|---------|----------|---------|---------|-------------------
fibonacci.ts  |   80%   |  85.71%  |   100%  |   75%   |       6
```

## 覆盖率指标说明

### 1. **Statements（语句覆盖率）- 80%**

**定义**：已执行的语句数 / 总语句数

**fibonacci.ts 的语句分析**：
```typescript
export function fibonacci(n: number): number {
  // 语句 1: 函数声明
  if (typeof n !== 'number' || n < 0 || !Number.isInteger(n)) {
    // 语句 2: if 条件判断
    throw new Error('Input must be a non-negative integer');
    // 语句 3: throw 语句 ✅ 已覆盖（测试了负数和非数字）
  }
  if (n <= 1) return n;
  // 语句 4: if 条件判断 ✅ 已覆盖（测试了 n=0 和 n=1）
  // 语句 5: return n ✅ 已覆盖（测试了 n=0 和 n=1）
  return fibonacci(n - 1) + fibonacci(n - 2);
  // 语句 6: 递归调用 ❌ 未覆盖（没有测试 n > 1 的情况）
}
```

**当前测试覆盖的语句**：
- ✅ 类型检查语句（测试了非数字）
- ✅ 负数检查语句（测试了 -1）
- ✅ n <= 1 的返回语句（测试了 0 和 1）
- ❌ 递归调用语句（没有测试 n > 1）

**覆盖率计算**：4/5 = 80%

---

### 2. **Branch（分支覆盖率）- 85.71%**

**定义**：已执行的分支数 / 总分支数

**fibonacci.ts 的分支分析**：

对于逻辑或表达式 `A || B || C`，Istanbul 会为每个子表达式创建分支点，并考虑短路求值：

```typescript
// 第一个 if: typeof n !== 'number' || n < 0 || !Number.isInteger(n)
// 
// 分支 1: typeof n !== 'number' 为 true
//   ✅ 已覆盖（测试了字符串 '1'）
//   此时短路求值，整个表达式为 true，不评估后续条件
//
// 分支 2: typeof n !== 'number' 为 false，继续评估 n < 0
//   ✅ 已覆盖（测试了数字类型）
//
// 分支 3: n < 0 为 true（在分支2为false的前提下）
//   ✅ 已覆盖（测试了 -1）
//   此时短路求值，整个表达式为 true，不评估后续条件
//
// 分支 4: n < 0 为 false（在分支2为false的前提下），继续评估 !Number.isInteger(n)
//   ✅ 已覆盖（测试了 0, 1, 2 等非负数）
//
// 分支 5: !Number.isInteger(n) 为 true（在前两个都为false的前提下）
//   ❌ 未覆盖（没有测试小数，如 1.5）
//
// 分支 6: !Number.isInteger(n) 为 false（在前两个都为false的前提下）
//   ✅ 已覆盖（测试了整数 0, 1, 2 等）
//   此时整个表达式为 false，继续执行下一个 if

// 第二个 if: n <= 1
// 分支 7: n <= 1 的分支
//   - true 分支 ✅ 已覆盖（测试了 0 和 1）
//   - false 分支 ❌ 未覆盖（没有测试 n > 1，如 n=2, n=3）
```

**总分支数**：7 个分支点
- 第一个 if 语句：6 个分支点（由于逻辑或的短路求值，Istanbul 会合并某些路径）
- 第二个 if 语句：1 个分支点（`n <= 1` 的 true/false，但 Istanbul 可能将其计算为 1 个决策点）

**已覆盖分支数**：6 个分支
**覆盖率计算**：6/7 = 85.71%

> **注意**：Istanbul 对于逻辑或表达式的分支计算方式较为复杂，它会考虑短路求值的影响，因此 4 个条件可能不会产生 8 个分支（4×2），而是 7 个分支。详细说明请参考 `BRANCH_COVERAGE_DETAILED.md`。

---

### 3. **Functions（函数覆盖率）- 100%**

**定义**：已调用的函数数 / 总函数数

**分析**：
- fibonacci.ts 中只有 1 个函数：`fibonacci`
- ✅ 该函数已被调用（测试中调用了 fibonacci(0), fibonacci(1) 等）

**覆盖率计算**：1/1 = 100%

---

### 4. **Lines（行覆盖率）- 75%**

**定义**：已执行的行数 / 总行数（排除空行和注释）

**fibonacci.ts 的行分析**：
```typescript
1| export function fibonacci(n: number): number {
2|   if (typeof n !== 'number' || n < 0 || !Number.isInteger(n)) {
3|     throw new Error('Input must be a non-negative integer');
4|   }
5|   if (n <= 1) return n;
6|   return fibonacci(n - 1) + fibonacci(n - 2);
7| }
```

**已覆盖的行**：
- ✅ 第 1 行：函数声明
- ✅ 第 2 行：条件判断
- ✅ 第 3 行：throw 语句
- ✅ 第 4 行：闭合大括号
- ✅ 第 5 行：n <= 1 的返回
- ❌ 第 6 行：递归调用（未覆盖）
- ✅ 第 7 行：闭合大括号

**覆盖率计算**：6/8 = 75%（实际计算可能略有不同，因为工具会排除某些行）

---

## 如何提高覆盖率

### 当前缺失的测试用例

1. **测试递归调用**（n > 1 的情况）
   ```typescript
   it('should return correct value for n > 1', () => {
     expect(fibonacci(2)).toBe(1);  // 0 + 1
     expect(fibonacci(3)).toBe(2);  // 1 + 1
     expect(fibonacci(4)).toBe(3);  // 1 + 2
     expect(fibonacci(5)).toBe(5);  // 2 + 3
   });
   ```

2. **测试非整数**（小数）
   ```typescript
   it('should throw an error when num is not an integer', () => {
     expect(() => fibonacci(1.5)).toThrow('Input must be a non-negative integer');
   });
   ```

### 添加测试后的预期覆盖率

- **Statements**: 100% （所有语句都被执行）
- **Branch**: 100% （所有分支都被测试）
- **Functions**: 100% （保持不变）
- **Lines**: 100% （所有行都被执行）

---

## 覆盖率计算工具原理

### Istanbul（Vitest 默认使用）

1. **代码插桩（Instrumentation）**：
   - 在源代码中插入计数器
   - 记录每个语句、分支、函数的执行情况

2. **执行测试**：
   - 运行测试用例
   - 插桩代码记录执行路径

3. **生成报告**：
   - 统计已执行和未执行的代码
   - 计算覆盖率百分比

### 示例：插桩后的代码（简化版）

```javascript
// 原始代码
if (n <= 1) return n;

// 插桩后的代码（概念性）
__coverage__.statements[5] = true;  // 标记语句已执行
if (n <= 1) {
  __coverage__.branches[4][0] = true;  // true 分支已执行
  __coverage__.statements[6] = true;
  return n;
} else {
  __coverage__.branches[4][1] = true;  // false 分支未执行
}
```

---

## 覆盖率指标的重要性排序

1. **Branch Coverage（分支覆盖率）** ⭐⭐⭐⭐⭐
   - 最重要，能发现逻辑错误
   - 确保所有条件分支都被测试

2. **Statements Coverage（语句覆盖率）** ⭐⭐⭐⭐
   - 确保所有代码都被执行
   - 但不能保证所有逻辑路径都被测试

3. **Lines Coverage（行覆盖率）** ⭐⭐⭐
   - 与语句覆盖率类似，但更直观

4. **Functions Coverage（函数覆盖率）** ⭐⭐
   - 最基础，只确保函数被调用
   - 不能保证函数内部逻辑被充分测试

---

## 最佳实践

1. **目标覆盖率**：
   - 关键业务逻辑：100% 分支覆盖率
   - 一般代码：80%+ 分支覆盖率
   - 工具函数：100% 覆盖率

2. **不要盲目追求 100%**：
   - 某些代码（如错误处理、边界情况）可能难以测试
   - 关注重要逻辑的覆盖率

3. **结合代码审查**：
   - 覆盖率是工具，不是目标
   - 高质量的测试用例比高覆盖率更重要

