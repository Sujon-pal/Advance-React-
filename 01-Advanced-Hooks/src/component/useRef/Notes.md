# 📌 React `useRef()` Complete Notes (Bangla + Programming Hero Style)

> `useRef()` হলো React-এর একটি Hook যা **value store** করতে পারে এবং **DOM element access** করতে পারে, কিন্তু value পরিবর্তন হলেও component re-render হয় না।

---

# Table of Contents

1. What is `useRef`
2. Syntax
3. How `useRef` Works
4. `useRef` vs `useState`
5. Accessing DOM Elements
6. Storing Mutable Values
7. Stopwatch Example (`setInterval`)
8. Lifecycle with `useRef`
9. Common Use Cases
10. Best Practices
11. Common Mistakes
12. Interview Questions
13. Summary

---

# 1️⃣ What is `useRef()`?

`useRef()` হলো React Hook যা একটি **mutable object** return করে।

```jsx
const ref = useRef(initialValue);
```

এটি একটি object return করে।

```jsx
{
   current: initialValue
}
```

সবসময় `.current` এর ভিতরে value থাকে।

### Example

```jsx
const numberRef = useRef(10);

console.log(numberRef.current); // 10
```

Value change করতে হলে—

```jsx
numberRef.current = 20;
```

কিন্তু UI update হবে না।

---

# 2️⃣ Syntax

```jsx
import { useRef } from "react";

const ref = useRef(initialValue);
```

| Part | Meaning |
|------|---------|
| `useRef()` | Hook call |
| `initialValue` | প্রথম value |
| `ref.current` | বর্তমান value |

### Example

```jsx
const inputRef = useRef(null);
const countRef = useRef(0);
```

---

# 3️⃣ How `useRef` Works

ধরো—

```jsx
const countRef = useRef(0);
```

React memory-তে object রাখে।

```jsx
countRef = {
   current: 0
}
```

যখন change করো—

```jsx
countRef.current++;
```

Object update হয়।

```jsx
current = 1
```

কিন্তু component render হয় না।

---

## Visual Flow

```text
Component Render
      │
      ▼
 useRef(0)
      │
      ▼
 { current: 0 }
      │
      ▼
 current = current + 1
      │
      ▼
 Value Changed
      │
      ▼
 ❌ No Re-render
```

---

# 4️⃣ `useRef` vs `useState`

| `useState` | `useRef` |
|------------|----------|
| Value store করে | Value store করে |
| Value change হলে re-render হয় | Value change হলেও re-render হয় না |
| UI update হয় | UI update হয় না |
| Async update | Immediate update |
| Component render trigger করে | Render trigger করে না |

---

## Example Comparison

### useState

```jsx
const [count, setCount] = useState(0);

setCount(count + 1);
```

**Result**

- Value update।
- UI update।
- Component render।

---

### useRef

```jsx
const countRef = useRef(0);

countRef.current++;
```

**Result**

- Value update।
- UI update হয় না।
- Render হয় না।

---

## কখন কোনটা ব্যবহার করবো?

<table columnSizing="equal">
  <table-row>
    <table-cell>
      **useState**
    </table-cell>
    <table-cell>
      **useRef**
    </table-cell>
  </table-row>
  <table-row>
    <table-cell>
      Counter
    </table-cell>
    <table-cell>
      Timer ID
    </table-cell>
  </table-row>
  <table-row>
    <table-cell>
      Theme Toggle
    </table-cell>
    <table-cell>
      Input Focus
    </table-cell>
  </table-row>
  <table-row>
    <table-cell>
      API Data
    </table-cell>
    <table-cell>
      Previous Value
    </table-cell>
  </table-row>
  <table-row>
    <table-cell>
      Loading State
    </table-cell>
    <table-cell>
      DOM Reference
    </table-cell>
  </table-row>
</table>

---

# 5️⃣ Accessing DOM Elements

`useRef` সবচেয়ে বেশি ব্যবহার হয় DOM access করার জন্য।

## Example — Button Color Change

```jsx
const btnRef = useRef();

const handleColor = () => {
   btnRef.current.style.backgroundColor = "red";
};

<button ref={btnRef}>
   Increment
</button>
```

### এখানে কী হচ্ছে?

```jsx
const btnRef = useRef();
```

Initially—

```js
btnRef.current = undefined
```

Render হওয়ার পরে—

```js
btnRef.current = HTMLButtonElement
```

এখন button access করা যাচ্ছে।

```jsx
btnRef.current.style.backgroundColor = "red";
```

---

## DOM Access Diagram

```text
Button Render
      │
      ▼
ref={btnRef}
      │
      ▼
btnRef.current
      │
      ▼
HTML Button Element
      │
      ▼
style / focus / value / scroll
```

---

## Input Focus Example

```jsx
const inputRef = useRef();

const focusInput = () => {
   inputRef.current.focus();
};

<input ref={inputRef} />
<button onClick={focusInput}>
   Focus Input
</button>
```

এটি Interview Favourite।

---

# 6️⃣ Storing Mutable Values

তোমার code example।

```jsx
const value = useRef(0);
const [count, setCount] = useState(0);
```

### Increment Function

```jsx
const handleCount = () => {
   value.current = value.current + 1;
   console.log(value.current);

   setCount(count + 1);
};
```

---

## Step-by-Step Execution

### First Click

```js
value.current = 1
count = 1
```

Console

```text
1
```

UI

```text
Value : 1
```

---

### Second Click

```text
value.current = 2
count = 2
```

Console

```text
2
```

---

## Important Observation

`value.current` change হচ্ছে।

কিন্তু UI তে দেখাচ্ছো `count`.

```jsx
<h4>Value : {count}</h4>
```

যদি লিখতে—

```jsx
<h4>{value.current}</h4>
```

তাহলে UI update হবে না।

কারণ render হয়নি।

---

## Why State Needed Here?

`useRef`

```jsx
value.current++;
```

Render করে না।

`useState`

```jsx
setCount(count + 1);
```

Render করে।

তাই নতুন render এ `.current` value দেখা যায়।

---

# 7️⃣ Stopwatch Example (`setInterval`)

তোমার Stopwatch component।

## Code

```jsx
const timeRef = useRef(null);
const [time, setTime] = useState(0);
```

---

## Why `useRef` Here?

`setInterval()` একটি **interval ID** return করে।

Example

```js
const id = setInterval(...);
```

ID save করতে হবে।

কিন্তু UI তে দরকার নেই।

তাই `useRef`.

---

## Start Timer

```jsx
const startTimer = () => {
   timeRef.current = setInterval(() => {
      setTime(time => time + 1);
   },1000);
};
```

### Flow

```text
Start Button
      │
      ▼
setInterval()
      │
      ▼
Interval ID
      │
      ▼
timeRef.current = ID
      │
      ▼
Every 1 sec
      │
      ▼
setTime()
      │
      ▼
UI Update
```

---

## Stop Timer

```jsx
clearInterval(timeRef.current);
timeRef.current = null;
```

### Why Null?

Timer stop হওয়ার পরে reference remove।

Memory clean থাকে।

---

## Reset Timer

```jsx
stopTimer();
setTime(0);
```

Stop + Reset value।

---

## Better Version (Prevent Multiple Timers)

```jsx
const startTimer = () => {
   if (timeRef.current) return;

   timeRef.current = setInterval(() => {
      setTime(time => time + 1);
   },1000);
};
```

কারণ বারবার Start চাপলে অনেক interval তৈরি হয়।

---

# 8️⃣ `useRef` + `useEffect`

তোমার Code

```jsx
useEffect(() => {
   console.log("run every render");
});
```

প্রতি render এ চলবে।

Render হচ্ছে কারণ—

```jsx
setCount(...)
```

---

## Track Previous Value

```jsx
const previous = useRef();

useEffect(() => {
   previous.current = count;
}, [count]);
```

### Example

| Current | Previous |
|--------|----------|
| 0 | undefined |
| 1 | 0 |
| 2 | 1 |
| 3 | 2 |

---

# 9️⃣ Common Use Cases

## 1. DOM Access

```jsx
const divRef = useRef();
```

- focus
- scroll
- style
- value

---

## 2. Timer ID

```jsx
const timerRef = useRef();
```

- setInterval
- setTimeout

---

## 3. Previous Value

```jsx
const previous = useRef();
```

---

## 4. Render Count

```jsx
const renderCount = useRef(1);

useEffect(() => {
   renderCount.current++;
});
```

Component কয়বার render হয়েছে।

---

## 5. Store API Cache / Mutable Data

যে value UI তে দেখানোর দরকার নেই।

Example

- socket connection
- websocket
- animation id

---

# 🔟 Best Practices

### ✅ DO

**DOM access**

```jsx
const inputRef = useRef();
```

**Timer**

```jsx
const timerRef = useRef(null);
```

**Cleanup**

```jsx
useEffect(() => {
   return () => clearInterval(timerRef.current);
}, []);
```

---

### ❌ DON'T

```jsx
ref.current = something
```

render trigger আশা করবে না।

---

### ❌ DON'T Store UI State

Wrong

```jsx
const nameRef = useRef("Sujon");
```

UI তে name change দেখাতে চাইলে `useState` ব্যবহার করো।

---

# 1️⃣1️⃣ Common Mistakes

## Mistake 1 — Forget `.current`

❌ Wrong

```jsx
console.log(value);
```

Output

```text
{ current: 0 }
```

✅ Correct

```jsx
console.log(value.current);
```

---

## Mistake 2 — Multiple Interval

❌ Wrong

```jsx
startTimer();
startTimer();
startTimer();
```

৩টা interval চলবে।

---

## Mistake 3 — No Cleanup

```jsx
useEffect(() => {
   timeRef.current = setInterval(...);
}, []);
```

Cleanup না করলে memory leak হতে পারে।

---

## Correct Cleanup

```jsx
useEffect(() => {
   return () => clearInterval(timeRef.current);
}, []);
```

---

## Mistake 4 — Expect UI Update

```jsx
countRef.current++;
```

UI change হবে না।

---

# 1️⃣2️⃣ Interview Questions

## Q1. `useRef` কী?

Component re-render ছাড়াই mutable value store করার Hook।

---

## Q2. `useRef` এবং `useState` পার্থক্য?

| useState | useRef |
|----------|--------|
| Render হয় | Render হয় না |
| UI update | UI update না |
| State Management | Mutable Reference |

---

## Q3. `ref.current` কী?

বর্তমান stored value অথবা DOM element reference।

---

## Q4. DOM access কিভাবে করো?

```jsx
const inputRef = useRef();

<input ref={inputRef}/>

inputRef.current.focus();
```

---

## Q5. Stopwatch এ `useRef` কেন?

Interval ID store করার জন্য।

---

## Q6. `useRef` change করলে render হয়?

**না।**

---

## Q7. `useRef(null)` কেন লিখি?

DOM render হওয়ার আগে কোনো element থাকে না।

তাই initial value `null`।

---

# 1️⃣3️⃣ Summary (Cheat Sheet)

| Topic | Remember |
|-------|----------|
| `useRef()` | Mutable object return করে |
| `.current` | Value store হয় |
| Render | Trigger করে না |
| DOM Access | `ref={myRef}` |
| Timer | Interval ID store |
| Previous Value | Store করা যায় |
| Focus Input | `inputRef.current.focus()` |
| Cleanup | `clearInterval(ref.current)` |

---

# 💡 Programming Hero Exam Note

### `useRef` মনে রাখার Shortcut

```text
useRef = Remember Value + Remember DOM

✔ Value পরিবর্তন হলেও Render হবে না।
✔ DOM element সরাসরি Access করা যায়।
✔ Timer ID, Previous Value, Focus, Scroll — সবখানে useRef খুব Useful।
```