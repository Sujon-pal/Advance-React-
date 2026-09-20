# 📌 React `useRef()` — Complete Notes

> `useRef()` is a React Hook that can **store a value** and **access DOM elements**, but changing that value does NOT cause the component to re-render.

---

# Table of Contents

1. What is `useRef`
2. Syntax
3. How `useRef` Works
4. `useRef` vs `useState`
5. Accessing DOM Elements
6. Storing Mutable Values
7. Stopwatch Example (`setInterval`)
8. `useRef` + `useEffect`
9. Common Use Cases
10. Best Practices
11. Common Mistakes
12. Interview Questions
13. Summary

---

# 1️⃣ What is `useRef()`?

`useRef()` is a React Hook that returns a **mutable object**.

```jsx
const ref = useRef(initialValue);
```

It returns an object shaped like this:

```jsx
{
   current: initialValue
}
```

The value always lives inside `.current`.

### Example

```jsx
const numberRef = useRef(10);

console.log(numberRef.current); // 10
```

To change the value:

```jsx
numberRef.current = 20;
```

But the UI will **not** update.

---

# 2️⃣ Syntax

```jsx
import { useRef } from "react";

const ref = useRef(initialValue);
```

| Part | Meaning |
|------|---------|
| `useRef()` | Hook call |
| `initialValue` | The starting value |
| `ref.current` | The current value |

### Example

```jsx
const inputRef = useRef(null);
const countRef = useRef(0);
```

---

# 3️⃣ How `useRef` Works

Suppose:

```jsx
const countRef = useRef(0);
```

React keeps an object in memory:

```jsx
countRef = {
   current: 0
}
```

When you change it:

```jsx
countRef.current++;
```

The object updates:

```jsx
current = 1
```

But the component does **not** re-render.

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
| Stores a value | Stores a value |
| Changing it triggers a re-render | Changing it does NOT trigger a re-render |
| UI updates | UI does not update |
| Update is asynchronous (batched) | Update is immediate (synchronous) |
| Triggers component render | Does not trigger render |

---

## Example Comparison

### useState

```jsx
const [count, setCount] = useState(0);

setCount(count + 1);
```

**Result**

- Value updates.
- UI updates.
- Component re-renders.

---

### useRef

```jsx
const countRef = useRef(0);

countRef.current++;
```

**Result**

- Value updates.
- UI does NOT update.
- No re-render.

---

## When to Use Which?

| **useState** | **useRef** |
|---|---|
| Counter | Timer ID |
| Theme Toggle | Input Focus |
| API Data | Previous Value |
| Loading State | DOM Reference |

---

# 5️⃣ Accessing DOM Elements

`useRef` is most commonly used to directly access DOM elements.

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

### What's happening here?

```jsx
const btnRef = useRef();
```

Initially:

```js
btnRef.current = undefined
```

After the render:

```js
btnRef.current = HTMLButtonElement
```

Now the button can be accessed directly:

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

This is an interview favorite.

---

# 6️⃣ Storing Mutable Values

From your own code:

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

Console:

```text
1
```

UI:

```text
Value : 1
```

---

### Second Click

```text
value.current = 2
count = 2
```

Console:

```text
2
```

---

## Important Observation

`value.current` is changing.

But the UI is showing `count`:

```jsx
<h4>Value : {count}</h4>
```

If you instead wrote:

```jsx
<h4>{value.current}</h4>
```

The UI would NOT update — because no re-render happened.

---

## Why Is State Needed Here?

`useRef`:

```jsx
value.current++;
```

Doesn't cause a render.

`useState`:

```jsx
setCount(count + 1);
```

Causes a render.

So the new `.current` value only becomes *visible* once a render (triggered by state) happens.

---

# 7️⃣ Stopwatch Example (`setInterval`)

From your Stopwatch component:

## Code

```jsx
const timeRef = useRef(null);
const [time, setTime] = useState(0);
```

---

## Why `useRef` Here?

`setInterval()` returns an **interval ID**.

```js
const id = setInterval(...);
```

That ID needs to be saved so it can be cleared later — but it's never needed in the UI.

So `useRef` is the right tool.

---

## Start Timer

```jsx
const startTimer = () => {
   timeRef.current = setInterval(() => {
      setTime(time => time + 1);
   }, 1000);
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

### Why set it to null?

Once the timer stops, the stale reference is removed, keeping things clean and letting you check `if (timeRef.current)` later.

---

## Reset Timer

```jsx
stopTimer();
setTime(0);
```

Stop + reset the value.

---

## Better Version (Prevent Multiple Timers)

```jsx
const startTimer = () => {
   if (timeRef.current) return;

   timeRef.current = setInterval(() => {
      setTime(time => time + 1);
   }, 1000);
};
```

Because clicking Start repeatedly without a guard creates multiple overlapping intervals — the timer speeds up abnormally.

---

# 8️⃣ `useRef` + `useEffect`

From your code:

```jsx
useEffect(() => {
   console.log("run every render");
});
```

This runs on every render — including renders caused by:

```jsx
setCount(...)
```

---

## Tracking the Previous Value

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

Tracks how many times a component has rendered.

---

## 5. Storing Non-UI / Mutable Data

Any value that doesn't need to be reflected in the UI:

- socket connection
- websocket instance
- animation frame id

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

...and then expect it to trigger a re-render. It won't.

---

### ❌ DON'T Store UI State in a Ref

Wrong:

```jsx
const nameRef = useRef("Sujon");
```

If you want the UI to update when the name changes, use `useState` instead.

---

# 1️⃣1️⃣ Common Mistakes

## Mistake 1 — Forgetting `.current`

❌ Wrong:

```jsx
console.log(value);
```

Output:

```text
{ current: 0 }
```

✅ Correct:

```jsx
console.log(value.current);
```

---

## Mistake 2 — Multiple Intervals

❌ Wrong:

```jsx
startTimer();
startTimer();
startTimer();
```

3 intervals will run simultaneously.

---

## Mistake 3 — No Cleanup

```jsx
useEffect(() => {
   timeRef.current = setInterval(...);
}, []);
```

Without cleanup, this can cause a memory leak.

---

## Correct Cleanup

```jsx
useEffect(() => {
   return () => clearInterval(timeRef.current);
}, []);
```

---

## Mistake 4 — Expecting UI Updates

```jsx
countRef.current++;
```

The UI will not change from this alone.

---

# 1️⃣2️⃣ Interview Questions

## Q1. What is `useRef`?

A Hook for storing a mutable value without causing the component to re-render.

---

## Q2. Difference between `useRef` and `useState`?

| useState | useRef |
|----------|--------|
| Causes re-render | Does not cause re-render |
| UI updates | UI does not update |
| Used for state management | Used for mutable references |

---

## Q3. What is `ref.current`?

The currently stored value, or a reference to a DOM element.

---

## Q4. How do you access the DOM with useRef?

```jsx
const inputRef = useRef();

<input ref={inputRef}/>

inputRef.current.focus();
```

---

## Q5. Why is `useRef` used in the Stopwatch?

To store the interval ID so it can be cleared later, without causing extra re-renders.

---

## Q6. Does changing a `useRef` value cause a re-render?

**No.**

---

## Q7. Why do we write `useRef(null)`?

Before the component renders, there's no DOM element to reference yet — so `null` is a safe initial value.

---

# 1️⃣3️⃣ Summary (Cheat Sheet)

| Topic | Remember |
|-------|----------|
| `useRef()` | Returns a mutable object |
| `.current` | Where the value is stored |
| Render | Not triggered by ref changes |
| DOM Access | `ref={myRef}` |
| Timer | Store the interval ID |
| Previous Value | Can be tracked with a ref |
| Focus Input | `inputRef.current.focus()` |
| Cleanup | `clearInterval(ref.current)` |

---

# 💡 Quick Exam Recap

### Shortcut to Remember `useRef`

```text
useRef = Remember Value + Remember DOM

✔ Changing the value does NOT trigger a re-render.
✔ You can directly access a DOM element.
✔ Timer ID, previous value, focus, scroll — useRef is useful everywhere.
```