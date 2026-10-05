# React Re-render — Short Note

## 1. Re-render কী?

React component-এর **function আবার execute হওয়াকে** re-render বলা যায়।

> Re-render মানে পুরো webpage reload হওয়া নয়।

```jsx
function Counter() {
  const [count, setCount] = useState(0);

  return <h1>{count}</h1>;
}
```

`setCount()` দিয়ে state পরিবর্তন হলে `Counter` আবার execute হবে।

---

## 2. কেন Re-render হয়?

মূলত ৩টি কারণ মনে রাখো:

1. **State change**
2. **Props change**
3. **Context value change**

এছাড়া parent re-render হলে তার child component-ও সাধারণত আবার render হতে পারে।

---

## 3. State Change → Re-render

```jsx
const [count, setCount] = useState(0);

<button onClick={() => setCount(count + 1)}>
  Increase
</button>
```

Flow:

```text
setCount()
   ↓
State changes
   ↓
Component re-renders
   ↓
New JSX তৈরি হয়
   ↓
React changes compare করে
   ↓
প্রয়োজনীয় DOM update হয়
```

---

## 4. Component পুরো Function আবার Run হয়

```jsx
function Counter() {
  console.log("Rendered");

  const [count, setCount] = useState(0);

  return (
    <button onClick={() => setCount(count + 1)}>
      {count}
    </button>
  );
}
```

প্রতিবার state change হলে:

```text
Counter()
Counter()
Counter()
```

আবার execute হয়।

কিন্তু React `useState`-এর মাধ্যমে state value ধরে রাখে।

---

## 5. Normal Variable vs State

### Normal Variable

```jsx
let count = 0;

count++;
```

শুধু variable change হবে। React automatically UI update করবে না।

### State

```jsx
const [count, setCount] = useState(0);

setCount(count + 1);
```

React বুঝতে পারে state পরিবর্তন হয়েছে → re-render করে।

---

## 6. Props Change

```jsx
function Parent() {
  const [name, setName] = useState("Sujon");

  return <Child name={name} />;
}

function Child({ name }) {
  return <h2>Hello {name}</h2>;
}
```

`name` change হলে:

```text
Parent state change
      ↓
Parent re-render
      ↓
New props
      ↓
Child re-render
```

---

## 7. Re-render ≠ Page Reload

### Page Reload

```text
Browser পুরো page reload করে
```

### Re-render

```text
Component আবার execute
        ↓
New JSX
        ↓
React changes compare করে
        ↓
প্রয়োজনীয় DOM update
```

তাই state change করলে পুরো website reload হয় না।

---

## 8. Re-render ≠ DOM Update

Component re-render হতে পারে, কিন্তু DOM-এর সবকিছু update হয় না।

React দেখে:

```text
Previous UI
     VS
New UI
```

তারপর যেটুকু change হয়েছে, প্রয়োজন অনুযায়ী সেটুকুই DOM-এ update করে।

---

# Interview Answer

### Q: What is re-render in React?

**Answer:**

> Re-render means React executes a component again when its state, props, or relevant context value changes. React then compares the new result with the previous one and updates only the necessary parts of the DOM.

### সহজে মনে রাখার Formula:

```text
State / Props / Context Change
            ↓
        Re-render
            ↓
     Component runs again
            ↓
      React compares
            ↓
     Necessary DOM update
```

## ⭐ মনে রাখবে

```text
Re-render = Component আবার execute
Re-render ≠ Page reload
Re-render ≠ পুরো DOM নতুন করে তৈরি
```

> **React re-render করে, তারপর প্রয়োজন অনুযায়ী DOM update করে।**
