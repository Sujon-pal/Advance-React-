from pathlib import Path

content = r"""# React `useReducer` Hook — Complete Short Note

> **`useReducer` হলো React-এর একটি Hook, যা complex state এবং state update logic manage করার জন্য ব্যবহার করা হয়।**

---

## 1. `useReducer` কী?

`useReducer` হলো `useState`-এর একটি alternative। বিশেষ করে যখন state complex হয় অথবা state update করার অনেক ধরনের logic থাকে, তখন `useReducer` বেশি useful।

### Syntax

```jsx
const [state, dispatch] = useReducer(reducer, initialState);