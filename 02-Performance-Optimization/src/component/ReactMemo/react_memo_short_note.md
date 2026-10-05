# React.memo() — Short Note

## 1. React.memo() কী?

`React.memo()` হলো React-এর একটি **performance optimization technique**।

এটা ব্যবহার করলে কোনো component-এর **props পরিবর্তন না হলে** parent component re-render করার সময় unnecessary child re-render এড়াতে সাহায্য করে।

> সহজভাবে: **Props একই থাকলে unnecessary re-render skip করতে `React.memo()` ব্যবহার করা হয়।**

---

## 2. Basic Example

### Without React.memo()

```jsx
import { useState } from "react";

function Child({ name }) {
  console.log("Child Render");

  return <h2>Hello {name}</h2>;
}

function Parent() {
  const [count, setCount] = useState(0);

  return (
    <>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>

      <Child name="Sujon" />
    </>
  );
}

export default Parent;
```

Button click করলে:

```text
Parent re-render
      ↓
Child re-render
```

যদিও `name="Sujon"` পরিবর্তন হয়নি।

---

## 3. With React.memo()

```jsx
import { useState, memo } from "react";

const Child = memo(function Child({ name }) {
  console.log("Child Render");

  return <h2>Hello {name}</h2>;
});

function Parent() {
  const [count, setCount] = useState(0);

  return (
    <>
      <button onClick={() => setCount(count + 1)}>
        Count: {count}
      </button>

      <Child name="Sujon" />
    </>
  );
}

export default Parent;
```

এখন button click করলে:

```text
Parent re-render
      ↓
Child props check
      ↓
Props same?
      ↓
YES
      ↓
Child re-render skip
```

---

## 4. Props Change হলে কী হবে?

```jsx
function Parent() {
  const [name, setName] = useState("Sujon");

  return (
    <>
      <button onClick={() => setName("Rahim")}>
        Change Name
      </button>

      <Child name={name} />
    </>
  );
}
```

এখানে:

```text
Sujon → Rahim
```

Props পরিবর্তন হয়েছে।

তাই `React.memo()` থাকলেও `Child` re-render করবে।

---

## 5. Important Point

`React.memo()` **re-render পুরোপুরি বন্ধ করে না**।

এটা mainly unnecessary re-render কমাতে সাহায্য করে।

```text
React.memo()
     ↓
Props check
     ↓
Same → re-render skip করতে পারে
Changed → re-render হবে
```

Component-এর নিজের state বা relevant context value পরিবর্তন হলেও component re-render করতে পারে।

---

## 6. কখন ব্যবহার করব?

`React.memo()` ব্যবহার করা useful হতে পারে যখন:

- Parent frequently re-render হয়
- Child-এর props frequently change করে না
- Child component expensive/heavy
- Unnecessary re-render performance-এর সমস্যা তৈরি করছে

ছোট/simple component-এ অযথা `React.memo()` ব্যবহার করার দরকার নেই।

---

# ⭐ Interview Answer

### What is React.memo()?

> `React.memo()` is a performance optimization technique in React that helps prevent unnecessary re-renders of a component when its props have not changed.

### সহজে মনে রাখো:

> **React.memo() = Props একই থাকলে unnecessary child re-render এড়াতে সাহায্য করে।**

---

## 🔥 One-Line Formula

```text
Parent Re-render
      ↓
React.memo()
      ↓
Props Same → Skip unnecessary render
Props Changed → Re-render
```
