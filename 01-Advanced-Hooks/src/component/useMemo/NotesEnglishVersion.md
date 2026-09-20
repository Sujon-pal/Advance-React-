# 🚀 React `useMemo()` — Complete Notes

> `useMemo()` is a React Hook used for **performance optimization**. It caches (memoizes) the result of an expensive calculation so React doesn't recalculate it on every re-render.

---

# 📚 Table of Contents

1. What is `useMemo()`
2. Why `useMemo` is Needed
3. Syntax
4. How `useMemo` Works
5. Memoization Explained
6. Your Example Explained
7. Dependency Array
8. `useMemo` vs Normal Function
9. `useMemo` vs `useCallback`
10. Real-World Use Cases
11. Best Practices
12. Common Mistakes
13. Advanced Examples
14. Interview Questions
15. Cheat Sheet Summary

---

# 1️⃣ What is `useMemo()`?

`useMemo()` is a React Hook that **memorizes the result of a calculation** and returns the cached value until its dependencies change.

It helps avoid unnecessary expensive computations during component re-renders.

### Definition

```jsx
const memoizedValue = useMemo(() => {
  return expensiveCalculation();
}, [dependencies]);
```

### Key Idea

- Calculates a value once.
- Stores (caches) the result.
- Recalculates only when dependencies change.

---

# 2️⃣ Why `useMemo` is Needed?

React re-renders a component whenever its state or props change.

During every render, **all functions inside the component execute again**.

### Without `useMemo`

```jsx
const result = expensiveTask(input);
```

Every render executes:

```text
Component Render
      │
      ▼
expensiveTask()
      │
      ▼
Heavy Calculation Again ❌
```

Even changing an unrelated state (`count`) runs the expensive function again.

### With `useMemo`

```jsx
const result = useMemo(() => expensiveTask(input), [input]);
```

Now React checks dependencies first.

```text
Component Render
      │
      ▼
Dependency Changed?
   │         │
  Yes        No
   │         │
   ▼         ▼
Run Task   Cached Result ✅
```

---

# 3️⃣ Syntax

```jsx
import { useMemo } from "react";

const memoizedValue = useMemo(() => {
  return calculation();
}, [dependency]);
```

## Syntax Breakdown

| Part | Description |
|------|-------------|
| `useMemo()` | React Hook |
| Callback Function | Performs calculation |
| Return Value | Cached result |
| Dependency Array | Controls recalculation |

---

# 4️⃣ How `useMemo` Works

## Flow Diagram

```text
Component Render
      │
      ▼
useMemo(callback, [deps])
      │
      ▼
Check Dependencies
      │
 ┌────┴────┐
 │         │
Changed?   Same?
 │         │
 ▼         ▼
Run Task  Return Cached Value
 │
 ▼
Save New Result
```

### Important Points

- Callback runs only when dependencies change.
- Cached value is reused between renders.
- Component still re-renders; only the calculation is skipped.

---

# 5️⃣ What is Memoization?

**Memoization** means storing the result of a function so it can be reused later instead of recalculating it.

### Example

First render:

```text
Input = 5

5 × 2 = 10
```

React caches `10`.

Second render with same input:

```text
Input = 5
```

React returns cached `10` instead of calculating again.

---

## Real-Life Analogy

Think of a calculator.

- First time: `200 × 300` → Calculation happens.
- Second time: Same numbers → Result is instantly returned from memory.

That's memoization.

---

# 6️⃣ Your Example Explained

## Complete Code

```jsx
const [count, setCount] = useState(0);
const [input, setInput] = useState(1);
```

### States

| State | Purpose |
|-------|---------|
| `count` | Counter value |
| `input` | User input value |

---

## Expensive Function

```jsx
const expensiveTask = (num) => {
  console.log("inside expensive task!!");

  for (let i = 0; i <= 1000000000; i++) {}

  return num * 2;
};
```

### Why is it expensive?

- Large loop.
- Takes noticeable time.
- Logs every execution.

---

## Without `useMemo`

```jsx
const doubleValue = expensiveTask(input);
```

### Render Flow

```text
Increment Button Click
        │
        ▼
Component Re-render
        │
        ▼
expensiveTask() Runs Again ❌
```

Even though `input` didn't change.

---

## With `useMemo`

```jsx
const doubleValue = useMemo(() => {
  return expensiveTask(input);
}, [input]);
```

### Render Flow

```text
Increment Click
      │
      ▼
Component Re-render
      │
      ▼
Did input change?
      │
      ├── No → Return Cached Value ✅
      └── Yes → Run expensiveTask()
```

---

## Output Behavior

| Action | Expensive Function Runs? |
|--------|---------------------------|
| Initial Render | ✅ Yes |
| Click Increment | ❌ No |
| Change Input | ✅ Yes |
| Click Increment Again | ❌ No |

---

# 7️⃣ Dependency Array Explained

The dependency array tells React **when to recalculate** the memoized value.

---

## Empty Dependency Array

```jsx
useMemo(() => calculate(), []);
```

Runs only once (initial render).

---

## Single Dependency

```jsx
useMemo(() => calculate(), [input]);
```

Runs only when `input` changes.

---

## Multiple Dependencies

```jsx
useMemo(() => calculate(), [price, tax]);
```

Runs when `price` or `tax` changes.

---

## No Dependency Array

```jsx
useMemo(() => calculate());
```

Runs on every render.

No optimization happens.

---

## Dependency Summary

| Dependency | Callback Executes |
|------------|-------------------|
| `[]` | Initial render only |
| `[value]` | When value changes |
| `[a, b]` | When `a` or `b` changes |
| No array | Every render |

---

# 8️⃣ `useMemo` vs Normal Function

## Normal Function

```jsx
const result = expensiveTask(input);
```

Every render executes the function.

---

## useMemo

```jsx
const result = useMemo(() => expensiveTask(input), [input]);
```

Function executes only when dependency changes.

---

## Comparison Table

| Normal Function | `useMemo` |
|-----------------|-----------|
| Runs every render | Uses cached value |
| No caching | Memoized result |
| Slower with heavy tasks | Better performance |
| Always recalculates | Dependency-based recalculation |

---

# 9️⃣ `useMemo` vs `useCallback`

A very common interview question.

| `useMemo` | `useCallback` |
|-----------|---------------|
| Memoizes a value | Memoizes a function |
| Returns calculated value | Returns a function |
| Used for expensive calculations | Used for event handlers / callbacks |

### useMemo Example

```jsx
const total = useMemo(() => price * quantity, [price, quantity]);
```

Returns a number.

### useCallback Example

```jsx
const handleClick = useCallback(() => {
  console.log("Clicked");
}, []);
```

Returns a function.

---

# 🔟 Real-World Use Cases

## 1. Filtering Large Data

```jsx
const filteredUsers = useMemo(() => {
  return users.filter(user =>
    user.name.includes(search)
  );
}, [users, search]);
```

Useful when thousands of items exist.

---

## 2. Sorting Large Arrays

```jsx
const sortedProducts = useMemo(() => {
  return [...products].sort((a, b) => a.price - b.price);
}, [products]);
```

Avoids unnecessary sorting.

---

## 3. Expensive Mathematical Calculation

```jsx
const factorialValue = useMemo(() => {
  return factorial(number);
}, [number]);
```

---

## 4. Transforming API Data

```jsx
const chartData = useMemo(() => {
  return apiData.map(item => ({
    id: item.id,
    value: item.price,
  }));
}, [apiData]);
```

---

## 5. Search + Filter

```jsx
const searchedCountries = useMemo(() => {
  return countries.filter(country =>
    country.name.common
      .toLowerCase()
      .includes(search.toLowerCase())
  );
}, [countries, search]);
```

Great example for the World Explorer project.

---

# 1️⃣1️⃣ Best Practices

## ✅ Use `useMemo` for Expensive Calculations

```jsx
const result = useMemo(() => heavyCalculation(data), [data]);
```

---

## ✅ Include All Dependencies

```jsx
const total = useMemo(() => {
  return price + tax;
}, [price, tax]);
```

---

## ✅ Keep Callback Pure

```jsx
const doubled = useMemo(() => value * 2, [value]);
```

The callback should return a value only.

---

## ❌ Don't Use `useMemo` for Simple Calculations

```jsx
const doubled = useMemo(() => count * 2, [count]);
```

This is unnecessary optimization.

---

## Rule of Thumb

| Calculation | Use `useMemo`? |
|-------------|----------------|
| `count * 2` | ❌ No |
| Filter 10,000 items | ✅ Yes |
| Sort large arrays | ✅ Yes |
| Heavy loops | ✅ Yes |

---

# 1️⃣2️⃣ Common Mistakes

## Mistake 1 — Missing Dependencies

```jsx
useMemo(() => total(price, tax), [price]);
```

`tax` changes won't trigger recalculation.

---

## Mistake 2 — Wrong Dependency

```jsx
useMemo(() => expensiveTask(input), [count]);
```

Wrong dependency means incorrect caching.

---

## Mistake 3 — Side Effects Inside `useMemo`

❌ Wrong

```jsx
useMemo(() => {
  fetch("/api/data");
}, []);
```

`fetch()` is a side effect.

Use `useEffect()` instead.

---

## Mistake 4 — Overusing `useMemo`

Using `useMemo` everywhere increases memory usage and code complexity.

Optimize only when needed.

---

# 1️⃣3️⃣ Advanced Examples

## Example 1 — Factorial Optimization

```jsx
const factorial = (n) => {
  if (n === 0) return 1;
  return n * factorial(n - 1);
};

const result = useMemo(() => factorial(number), [number]);
```

---

## Example 2 — Filter + Sort Together

```jsx
const filteredProducts = useMemo(() => {
  return products
    .filter(item => item.category === category)
    .sort((a, b) => a.price - b.price);
}, [products, category]);
```

---

## Example 3 — Derived State

```jsx
const completedTodos = useMemo(() => {
  return todos.filter(todo => todo.completed);
}, [todos]);
```

---

## Example 4 — Memoizing Objects

```jsx
const options = useMemo(() => {
  return {
    theme: "dark",
    fontSize: 18,
  };
}, []);
```

Useful when passing objects as props.

---

## Example 5 — `React.memo` + `useMemo`

```jsx
const activeUsers = useMemo(() => {
  return users.filter(user => user.active);
}, [users]);

<UsersList users={activeUsers} />
```

- `useMemo` caches the filtered array.
- `React.memo` prevents unnecessary child renders.

---

# 1️⃣4️⃣ Performance Visualization

## Without useMemo

```text
Click Increment
      │
      ▼
Component Re-renders
      │
      ▼
Heavy Calculation Again ❌
      │
      ▼
UI Becomes Slow
```

---

## With useMemo

```text
Click Increment
      │
      ▼
Component Re-renders
      │
      ▼
Dependency Changed?
      │
      ├── No
      │     ▼
      │ Cached Value Returned ✅
      │
      └── Yes
            ▼
     Heavy Calculation Runs
```

---

# 1️⃣5️⃣ Interview Questions

### Q1. What is `useMemo()`?

A React Hook that memoizes the result of an expensive calculation.

---

### Q2. Why use `useMemo()`?

To improve performance by avoiding unnecessary recalculations during re-renders.

---

### Q3. Does `useMemo` prevent component re-rendering?

**No.**

It prevents recalculating the memoized value, not rendering the component.

---

### Q4. Difference between `useMemo` and `useCallback`?

- `useMemo` returns a cached value.
- `useCallback` returns a cached function.

---

### Q5. What is Memoization?

Memoization is the process of caching previously computed results and reusing them until dependencies change.

---

### Q6. What happens if the dependency array is empty?

The callback runs only on the initial render.

---

### Q7. What happens without a dependency array?

The callback runs on every render, so memoization is ineffective.

---

### Q8. When should you avoid `useMemo`?

Avoid it for simple calculations because memoization also has a small memory cost.

---

# 1️⃣6️⃣ Cheat Sheet Summary

| Topic | Remember |
|-------|----------|
| `useMemo()` | Memoizes a calculated value |
| Purpose | Performance optimization |
| Returns | Cached value |
| Re-render | Component still re-renders |
| Re-calculation | Only when dependencies change |
| Best For | Filtering, sorting, heavy calculations |
| Not For | Simple calculations like `count * 2` |

---

# 🎯 Programming Hero Exam Notes

## Easy Memory Trick

```text
useMemo = Memoize VALUE

VALUE + Dependency Array
        ↓
 Cached Result
        ↓
 Better Performance 🚀
```

### Formula to Remember

```jsx
const memoizedValue = useMemo(() => expensiveTask(input), [input]);
```

- Initial Render → Calculate + Cache.
- Same Dependency → Return Cached Value.
- Dependency Changes → Recalculate + Update Cache.

---

# ✅ Your Example Explained in One Sentence

```jsx
const doubleValue = useMemo(() => expensiveTask(input), [input]);
```

This ensures `expensiveTask(input)` runs **only when `input` changes**, not when `count` changes, making the component much more efficient.