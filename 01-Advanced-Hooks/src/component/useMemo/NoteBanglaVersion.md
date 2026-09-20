# 🚀 React `useMemo()` 

> `useMemo()` হলো React-এর একটি Performance Optimization Hook। এটি **expensive calculation-এর result memoize (cache)** করে রাখে, যাতে অপ্রয়োজনীয় re-calculation না হয়।

---

# 📚 Table of Contents

1. What is `useMemo`
2. Why `useMemo` is Needed
3. Syntax
4. How `useMemo` Works
5. Understanding Memoization
6. Your Example Explained
7. Dependency Array Explained
8. `useMemo` vs Normal Function
9. `useMemo` vs `useCallback`
10. Real Life Use Cases
11. Best Practices
12. Common Mistakes
13. Advanced Examples
14. Interview Questions
15. Cheat Sheet Summary

---

# 1️⃣ What is `useMemo()`?

`useMemo()` হলো React Hook যা **একটি calculated value cache করে রাখে**।

React component যখন re-render হয়, তখন `useMemo` আগের result reuse করে যদি dependency change না হয়।

### Definition

```jsx
const memoizedValue = useMemo(() => {
   return expensiveCalculation();
}, [dependencies]);
```

### সহজ ভাষায়

- Expensive Function Run করবে।
- Result Save করবে।
- Dependency Change না হলে আবার Run করবে না।

---

# 2️⃣ Why `useMemo` is Needed?

React-এ Parent বা Component re-render হলে সব function আবার execute হয়।

Example:

```jsx
const expensiveTask = () => {
   // Huge calculation
};
```

যদি Component render হয় ১০ বার...

`expensiveTask()` ও ১০ বার চলবে।

এটি Performance কমিয়ে দেয়।

### Without useMemo

```text
Render
  ↓
expensiveTask()
  ↓
Result

Render Again
  ↓
expensiveTask()
  ↓
Result Again ❌
```

### With useMemo

```text
Render
  ↓
expensiveTask()
  ↓
Cache Result

Render Again
  ↓
Dependency Same?
      │
     YES
      │
      ▼
Return Cached Result ✅
```

---

# 3️⃣ Syntax

```jsx
import { useMemo } from "react";

const value = useMemo(() => {
   return calculation();
}, [dependency]);
```

### Breakdown

| Part | Meaning |
|------|---------|
| `useMemo()` | React Hook |
| Callback | Calculation Function |
| Return | Memoized Value |
| Dependency Array | কখন আবার calculate হবে |

---

# 4️⃣ How `useMemo` Works

## Step-by-Step Flow

```text
Component Render
      │
      ▼
useMemo(callback,[deps])
      │
      ▼
Dependency Changed?
      │
 ┌────┴────┐
 │         │
YES        NO
 │         │
 ▼         ▼
Run       Return
Callback  Cached Value
 │
 ▼
Store New Result
```

---

# 5️⃣ Understanding Memoization

## Memoization কী?

Memoization = **Calculation Result Cache করা**।

Example:

```jsx
5 × 2 = 10
```

React Result Save করে রাখবে।

Next Render:

```jsx
5 × 2
```

আবার Calculation করবে না।

Cache থেকে 10 দিবে।

---

## Real Life Analogy

Imagine Calculator.

First Time:

```text
200 × 300
```

Time লাগলো।

Second Time একই Input:

```text
200 × 300
```

Instant Result।

কারণ Cache।

---

# 6️⃣ Your Example Explained (Line by Line)

## Complete Code

```jsx
const [count, setCount] = useState(0);
const [input, setInput] = useState(1);
```

দুটি State আছে।

| State | Purpose |
|-------|---------|
| count | Counter |
| input | Number Input |

---

## Expensive Function

```jsx
const expensiveTask = (num) => {
   console.log("inside expensive task!!");

   for(let i=0;i<=1000000000;i++){}

   return num * 2;
};
```

### এখানে কী হচ্ছে?

- Console Print।
- Huge Loop।
- Delay তৈরি করছে।
- শেষে Double Return করছে।

---

## Without useMemo

```jsx
let doubleValue = expensiveTask(input);
```

### Every Render

```text
Increment Button Click
        │
        ▼
Component Render
        │
        ▼
expensiveTask() Again ❌
```

Count Change হলেও Function Run।

---

## With useMemo

```jsx
let doubleValue = useMemo(() => {
   return expensiveTask(input);
}, [input]);
```

### Now Flow

```text
Increment Click
     │
     ▼
Render
     │
     ▼
input Changed?
     │
   NO
     │
     ▼
Cached Value Returned ✅
```

---

## What Happens?

### Initial Render

```text
inside expensive task!!
Double Value = 2
```

---

### Click Increment

```text
Count = 1

inside expensive task?? ❌
```

Console কিছু Print হবে না।

---

### Change Input 5

```text
inside expensive task!!
Double Value = 10
```

কারণ Dependency Change হয়েছে।

---

# 7️⃣ Dependency Array Explained

Dependency Array বলে দেয়—

**কখন Memo Recalculate হবে।**

---

## Empty Dependency

```jsx
useMemo(() => calculate(), []);
```

শুধু First Render এ Run।

---

## One Dependency

```jsx
useMemo(() => calculate(), [input]);
```

শুধু Input Change হলে।

---

## Multiple Dependency

```jsx
useMemo(() => calculate(), [price, tax]);
```

Price অথবা Tax Change হলে।

---

## No Dependency Array

```jsx
useMemo(() => calculate());
```

Every Render Run।

Memoization হবে না।

---

## Dependency Visualization

| Dependency | Callback Runs |
|------------|---------------|
| `[]` | Only First Render |
| `[input]` | Input Changes |
| `[a,b]` | a বা b Changes |
| No Array | Every Render |

---

# 8️⃣ useMemo vs Normal Function

## Normal Function

```jsx
const result = expensiveTask(input);
```

Every Render Run।

---

## useMemo

```jsx
const result = useMemo(() => expensiveTask(input), [input]);
```

Dependency Change ছাড়া Run না।

---

## Comparison Table

| Normal Function | useMemo |
|-----------------|---------|
| Every Render | Cached |
| Slow | Fast |
| No Cache | Cache Result |
| Recalculate Always | Dependency Based |

---

# 9️⃣ useMemo vs useCallback

এটি খুব Important Interview Question।

## Difference

| useMemo | useCallback |
|----------|-------------|
| Value Memoize করে | Function Memoize করে |
| Returns Value | Returns Function |
| Expensive Calculation | Event Handler Optimization |

---

## useMemo Example

```jsx
const total = useMemo(() => price * quantity, [price, quantity]);
```

Returns Number।

---

## useCallback Example

```jsx
const handleClick = useCallback(() => {
   console.log("clicked");
}, []);
```

Returns Function।

---

## Easy Shortcut

```text
useMemo
    ↓
Memoize VALUE

useCallback
    ↓
Memoize FUNCTION
```

---

# 🔟 Real Life Use Cases

## 1. Large Filtering

```jsx
const filteredUsers = useMemo(() => {
   return users.filter(user =>
      user.name.includes(search)
   );
}, [users, search]);
```

হাজার User Filter হলে Useful।

---

## 2. Sorting Huge Data

```jsx
const sortedProducts = useMemo(() => {
   return [...products].sort((a,b)=>a.price-b.price);
}, [products]);
```

Sorting বারবার হবে না।

---

## 3. Expensive Math Calculation

```jsx
const factorial = useMemo(() => {
   return calculateFactorial(number);
}, [number]);
```

---

## 4. API Data Transformation

```jsx
const chartData = useMemo(() => {
   return apiData.map(item=>({...}));
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

Programming Hero World Explorer Project Example।

---

# 1️⃣1️⃣ Best Practices

## ✅ Use When Calculation Expensive

```jsx
const result = useMemo(() => heavyWork(data), [data]);
```

---

## ✅ Use Dependency Correctly

সব dependency include করো।

```jsx
useMemo(() => total(price, tax), [price, tax]);
```

---

## ✅ Pure Function রাখো

```jsx
useMemo(() => {
   return value * 2;
}, [value]);
```

---

## ❌ Don't Use for Everything

Wrong

```jsx
const double = useMemo(() => count * 2, [count]);
```

Simple Calculation এ প্রয়োজন নেই।

---

## Rule of Thumb

| Calculation | useMemo Needed? |
|-------------|-----------------|
| count * 2 | ❌ No |
| Filter 10000 Items | ✅ Yes |
| Sort Big Array | ✅ Yes |
| Heavy Loop | ✅ Yes |

---

# 1️⃣2️⃣ Common Mistakes

## Mistake 1 — Missing Dependency

```jsx
useMemo(() => total(price, tax), [price]);
```

Tax Change হলেও Update হবে না।

---

## Mistake 2 — Wrong Dependency

```jsx
useMemo(() => calculate(), [count]);
```

Input এর Calculation Count এ Depend করছে না।

---

## Mistake 3 — Side Effect Inside useMemo

Wrong

```jsx
useMemo(() => {
   fetch("/api");
}, []);
```

`fetch` হলো Side Effect।

`useEffect` ব্যবহার করো।

---

## Mistake 4 — Using useMemo Everywhere

সব Calculation Memoize করলে Memory Waste হয়।

---

# 1️⃣3️⃣ Advanced Examples

## Example 1 — Factorial Optimization

```jsx
const factorial = (n)=>{
   if(n===0) return 1;
   return n*factorial(n-1);
}

const result = useMemo(()=>{
   return factorial(number);
},[number]);
```

Heavy Recursive Function।

---

## Example 2 — Filter + Sort Together

```jsx
const filteredProducts = useMemo(() => {
   return products
      .filter(item => item.category===category)
      .sort((a,b)=>a.price-b.price);
}, [products, category]);
```

---

## Example 3 — Derived State

```jsx
const completedTodos = useMemo(()=>{
   return todos.filter(todo=>todo.completed);
},[todos]);
```

---

## Example 4 — Object Memoization

```jsx
const options = useMemo(()=>{
   return {
      theme:"dark",
      fontSize:18
   };
},[]);
```

Child Component Re-render কমাতে Useful।

---

## Example 5 — React.memo + useMemo

```jsx
const filteredUsers = useMemo(()=>{
   return users.filter(user=>user.active);
},[users]);

<UsersList users={filteredUsers}/>
```

`React.memo()` Child কে Unnecessary Render থেকে বাঁচায়।

---

# 1️⃣4️⃣ Performance Visualization

## Without useMemo

```text
Increment Button
      │
      ▼
Component Render
      │
      ▼
Heavy Loop (1 Billion)
      │
      ▼
UI Slow
```

---

## With useMemo

```text
Increment Button
      │
      ▼
Component Render
      │
      ▼
Dependency Changed?
      │
      ▼
No
      │
      ▼
Cached Value
      │
      ▼
UI Fast 🚀
```

---

# 1️⃣5️⃣ Interview Questions

## Q1. What is useMemo?

A Hook that memoizes a calculated value to improve performance.

---

## Q2. Why useMemo?

Avoid unnecessary expensive calculations during re-render.

---

## Q3. Does useMemo prevent re-render?

❌ No.

It prevents **re-calculation**, not component rendering.

---

## Q4. Difference between useMemo and useCallback?

| useMemo | useCallback |
|----------|-------------|
| Memoized Value | Memoized Function |
| Returns Result | Returns Function |

---

## Q5. When should you NOT use useMemo?

- Simple Calculations.
- Small Components.
- When Optimization isn't needed.

---

## Q6. What is Memoization?

Caching previous calculation results and reusing them until dependencies change.

---

## Q7. What happens if dependency array is empty?

Runs only on first render.

---

## Q8. What happens without dependency array?

Runs on every render.

---

# 1️⃣6️⃣ Cheat Sheet Summary

| Topic | Remember |
|-------|----------|
| `useMemo()` | Memoize Calculated Value |
| Purpose | Performance Optimization |
| Returns | Cached Value |
| Re-render | Component Still Re-renders |
| Re-calculation | Only Dependency Change |
| Best For | Filter, Sort, Heavy Loop, Expensive Calculation |
| Not For | Simple Math |

---

# 🧠 Programming Hero Exam Note

## Easy Memory Trick

```text
useMemo = Memoize VALUE

VALUE Cache
      +
Dependency Array
      =
Fast Performance 🚀
```

### Remember This Formula

```jsx
const memoizedValue = useMemo(() => expensiveTask(input), [input]);
```

- First Render → Calculate + Cache.
- Same Dependency → Cached Value.
- Changed Dependency → Recalculate + Update Cache.

---

# ✅ Your Code Output Flow

| Action | Expensive Function Runs? |
|--------|---------------------------|
| Initial Render | ✅ Yes |
| Click Increment | ❌ No |
| Change Input | ✅ Yes |
| Click Increment Again | ❌ No |

This is the exact behavior of your `UseMemo` component.