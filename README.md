# test-vitest

## 规范

it or test
- it 是 BDD 行为驱动开发风格中常用的约定命名
- test 是传统的命名约定
选一个在项目中保持统一即可

toBe or toEqual
- toBe 比较的是对象的引用，也就是栈内的东西，通常用于比较基础类型
- toEqual 递归检查所有字段的相等性

测试文件位置
- src/test/ 集中管理
- src/components/ 和组件写在同一目录下，并保持名字关联
- 内联测试

测试用例
- 清晰描述目的
- 每个用例只测试单一功能和场景
- 尽量把函数功能也单一化
- 边界情况和异常情况应该也进行测试，确保方法能正常处理而不是导致系统崩溃

## 测试 React 项目

### 配置


### 方法测试

最基础的测试，尽量让方法功能单一化，测试各种边界情况

### 快照测试

第一次执行完测试用例后，会生成 `__snapshots__` 目录，里面有快照文件，后续测试时会将最新结果与这里的结果进行对比，如果结果一致，则代表测试通过

### 组件测试


### React Hook 测试


### 异步 Mock 测试

## 语法

- vitest
  - expect
  - it
  - test
  - describe 快照测试

- @testing-library/react
  - act
  - fireEvent
  - render
  - renderHook

### 测试覆盖率

- Statements 语句，确保所有代码都被执行，但是不能保证所有逻辑路径都被测试
- Branch 分支，不同 if 条件下的情况，最重要，确保所有逻辑都被测试
- Functions 函数，调用其他函数是否会被覆盖，最基础，不能保证内部逻辑测试
- Lines，行，与 Statements 类似，但是更加直观

工具函数和关键逻辑可以要求 100% 覆盖率，一般的代码不需要强求 100% 覆盖率

## 压力测试

artillery


