# Obsolete Snapshot（过时快照）解释

## 什么是 Obsolete Snapshot？

**Obsolete Snapshot（过时快照）** 是指快照文件中存在某个快照条目，但测试代码中已经没有对应的测试用例了。

## 当前情况分析

### 终端输出显示

```
Snapshots  2 obsolete
             ↳ src/test/Results.test.tsx
               · Results > should renders correctly with styles (no stus) > styles-no-stus 1
               · Results > should renders correctly with styles (with stus) > styles-with-stus 1
```

### 问题原因

1. **快照文件中有**（`Results.test.tsx.snap`）：
   - ✅ `Results > should renders correctly with styles (no stus) > styles-no-stus 1`（第 42-72 行）
   - ✅ `Results > should renders correctly with styles (with stus) > styles-with-stus 1`（第 74-178 行）

2. **测试文件中没有**（`Results.test.tsx`）：
   - ❌ 没有对应的测试用例调用这些快照
   - 只有这两个测试用例：
     - `should renders correctly with no stus`
     - `should renders correctly with stus`

### 历史背景

这些过时的快照很可能是：
- 之前添加了样式快照测试用例
- 后来这些测试用例被移除了
- 但快照文件中的条目没有被清理

## 快照文件结构

```javascript
// 快照文件：Results.test.tsx.snap

// ✅ 有效的快照（有对应的测试用例）
exports[`Results > should renders correctly with no stus 1`] = `...`;
exports[`Results > should renders correctly with stus 1`] = `...`;

// ❌ 过时的快照（没有对应的测试用例）
exports[`Results > should renders correctly with styles (no stus) > styles-no-stus 1`] = `...`;
exports[`Results > should renders correctly with styles (with stus) > styles-with-stus 1`] = `...`;
```

## 如何清理过时的快照

### 方法 1：使用 Vitest 自动清理（推荐）

```bash
# 运行测试并自动更新快照（会删除过时的快照）
pnpm test --run -u
```

或者：

```bash
# 只更新特定测试文件的快照
pnpm test --run -u src/test/Results.test.tsx
```

### 方法 2：手动删除

直接编辑 `src/test/__snapshots__/Results.test.tsx.snap` 文件，删除第 42-178 行的过时快照条目。

## 快照命名规则

快照的名称格式为：
```
exports[`<describe名称> > <test名称> > <快照名称> <序号>`] = `...`;
```

例如：
- `Results > should renders correctly with no stus 1`
  - `Results`：describe 块名称
  - `should renders correctly with no stus`：测试用例名称
  - `1`：快照序号（如果有多个快照）

- `Results > should renders correctly with styles (no stus) > styles-no-stus 1`
  - `Results`：describe 块名称
  - `should renders correctly with styles (no stus)`：测试用例名称
  - `styles-no-stus`：自定义快照名称（通过 `toMatchSnapshot('styles-no-stus')` 指定）
  - `1`：快照序号

## 为什么会出现 Obsolete Snapshot？

### 常见场景

1. **测试用例被删除**
   - 移除了某个测试用例
   - 但忘记清理对应的快照

2. **测试用例被重构**
   - 修改了测试用例的名称
   - 旧的快照没有被更新

3. **快照名称改变**
   - 修改了 `toMatchSnapshot()` 的参数
   - 生成了新的快照名称
   - 旧的快照没有被清理

4. **合并代码冲突**
   - 多人协作时，有人删除了测试用例
   - 但快照文件没有同步更新

## 最佳实践

### 1. 定期清理

```bash
# 每次运行测试时检查过时的快照
pnpm test --run
```

### 2. 提交前检查

```bash
# 确保没有过时的快照
pnpm test --run -u
```

### 3. CI/CD 中检查

在持续集成中，可以配置测试失败如果有过时的快照：

```json
{
  "scripts": {
    "test:ci": "vitest run --coverage"
  }
}
```

### 4. 使用 Git 钩子

在提交前自动检查并清理：

```bash
# .git/hooks/pre-commit
#!/bin/sh
pnpm test --run -u
```

## 当前解决方案

运行以下命令清理过时的快照：

```bash
pnpm test --run -u src/test/Results.test.tsx
```

这会：
1. ✅ 删除过时的快照条目
2. ✅ 保留有效的快照
3. ✅ 更新快照文件

## 总结

- **Obsolete Snapshot** = 快照文件中有，但测试代码中没有对应的测试用例
- **影响**：不会导致测试失败，但会增加快照文件的大小
- **解决**：使用 `pnpm test --run -u` 自动清理
- **预防**：定期运行测试并检查过时的快照


