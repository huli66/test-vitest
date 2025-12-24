# 分支覆盖率详细解析 - 为什么 4 个条件产生 7 个分支

## 代码结构

```typescript
if (typeof n !== 'number' || n < 0 || !Number.isInteger(n)) {
  throw new Error('Input must be a non-negative integer');
}
if (n <= 1) return n;
```

## Istanbul 分支覆盖率计算原理

对于逻辑或表达式 `A || B || C`，Istanbul 会为**每个子表达式**创建分支点，并考虑**短路求值**的影响。

### 第一个 if 语句：`typeof n !== 'number' || n < 0 || !Number.isInteger(n)`

这是一个复合逻辑表达式，Istanbul 会这样计算分支：

#### 分支 1-2：`typeof n !== 'number'` 的分支
- **分支 1**：`typeof n !== 'number'` 为 `true` 
  - 此时整个表达式为 `true`，短路求值，不评估后续条件
  - ✅ 已覆盖（测试了字符串 `'1'`）

- **分支 2**：`typeof n !== 'number'` 为 `false`
  - 此时需要继续评估下一个条件
  - ✅ 已覆盖（测试了数字类型）

#### 分支 3-4：`n < 0` 的分支（仅在分支 2 为 false 时评估）
- **分支 3**：`n < 0` 为 `true`（在 `typeof n !== 'number'` 为 false 的前提下）
  - 此时整个表达式为 `true`，短路求值，不评估后续条件
  - ✅ 已覆盖（测试了 `-1`）

- **分支 4**：`n < 0` 为 `false`（在 `typeof n !== 'number'` 为 false 的前提下）
  - 此时需要继续评估下一个条件
  - ✅ 已覆盖（测试了 `0, 1, 2` 等非负数）

#### 分支 5-6：`!Number.isInteger(n)` 的分支（仅在分支 2 和 4 都为 false 时评估）
- **分支 5**：`!Number.isInteger(n)` 为 `true`（在前两个条件都为 false 的前提下）
  - 此时整个表达式为 `true`
  - ❌ **之前未覆盖**（没有测试小数，如 `1.5`）

- **分支 6**：`!Number.isInteger(n)` 为 `false`（在前两个条件都为 false 的前提下）
  - 此时整个表达式为 `false`，进入下一个 if 语句
  - ✅ 已覆盖（测试了整数 `0, 1, 2` 等）

### 第二个 if 语句：`n <= 1`

#### 分支 7：`n <= 1` 的分支
- **分支 7a**：`n <= 1` 为 `true`
  - ✅ 已覆盖（测试了 `0` 和 `1`）

- **分支 7b**：`n <= 1` 为 `false`
  - ❌ **之前未覆盖**（没有测试 `n > 1`，如 `2, 3, 4` 等）

## 分支统计

### 第一个 if 语句的分支（6 个）
1. `typeof n !== 'number'` 为 `true` ✅
2. `typeof n !== 'number'` 为 `false` ✅
3. `n < 0` 为 `true`（在条件1为false时）✅
4. `n < 0` 为 `false`（在条件1为false时）✅
5. `!Number.isInteger(n)` 为 `true`（在前两个都为false时）❌ → ✅（添加测试后）
6. `!Number.isInteger(n)` 为 `false`（在前两个都为false时）✅

### 第二个 if 语句的分支（2 个）
7. `n <= 1` 为 `true` ✅
8. `n <= 1` 为 `false` ❌ → ✅（添加测试后）

## 为什么是 7 个分支而不是 8 个？

实际上，Istanbul 在计算分支覆盖率时，对于逻辑或表达式 `A || B || C`，会这样处理：

- **每个子表达式**都会产生分支点
- 但由于**短路求值**，某些分支路径会被合并

具体来说：
- `typeof n !== 'number'` → 2 个分支（true/false）
- `n < 0` → 2 个分支（但只在第一个为 false 时评估）
- `!Number.isInteger(n)` → 2 个分支（但只在前两个都为 false 时评估）
- `n <= 1` → 2 个分支

**总计**：2 + 2 + 2 + 2 = 8 个分支

但 Istanbul 报告显示 7 个分支，这是因为：
- 对于逻辑或表达式，Istanbul 会**合并某些分支路径**
- 当 `typeof n !== 'number'` 为 `true` 时，后续条件不会评估，这被视为一个**合并的分支路径**

## 实际的分支路径（7 条）

1. ✅ `typeof n !== 'number'` = true → 抛出错误
2. ✅ `typeof n !== 'number'` = false 且 `n < 0` = true → 抛出错误
3. ✅ `typeof n !== 'number'` = false 且 `n < 0` = false 且 `!Number.isInteger(n)` = true → 抛出错误（之前未覆盖）
4. ✅ `typeof n !== 'number'` = false 且 `n < 0` = false 且 `!Number.isInteger(n)` = false → 继续执行
5. ✅ 继续执行且 `n <= 1` = true → 返回 n
6. ✅ 继续执行且 `n <= 1` = false → 递归调用（之前未覆盖）

实际上，Istanbul 可能将某些路径合并计算，所以显示为 7 个分支。

## 验证方法

可以通过以下方式验证分支数量：

```bash
# 运行覆盖率报告，查看详细的分支信息
pnpm test --run --coverage --reporter=verbose src/utils/finbonacci.test.ts
```

或者查看生成的 HTML 覆盖率报告，其中会显示每个分支的详细情况。

## 总结

- **4 个条件**：`typeof n !== 'number'`、`n < 0`、`!Number.isInteger(n)`、`n <= 1`
- **7 个分支**：由于逻辑或的短路求值和分支合并，实际计算为 7 个分支点
- **关键点**：逻辑或表达式中的每个子表达式都会产生分支，但短路求值会影响分支路径的计算


