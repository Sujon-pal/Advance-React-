# React `useReducer` Hook — Complete Short Note

> **`useReducer` হলো React-এর একটি Hook, যা complex state এবং state update logic manage করার জন্য ব্যবহার করা হয়।**

---

## 1. `useReducer` কী?

`useReducer` হলো `useState`-এর একটি alternative। বিশেষ করে যখন state complex হয় অথবা state update করার অনেক ধরনের logic থাকে, তখন `useReducer` বেশি useful।

### Syntax

```jsx
const [state, dispatch] = useReducer(reducer, initialState);
```

| Part | Meaning |
|---|---|
| `state` | বর্তমান state |
| `dispatch` | action পাঠানোর function |
| `reducer` | state কীভাবে update হবে তার logic |
| `initialState` | initial/starting state |

---

# 2. `useReducer` কীভাবে কাজ করে?

সবচেয়ে important flow:

```text
User Event
    ↓
dispatch(action)
    ↓
reducer(state, action)
    ↓
new state
    ↓
React re-render
```

### Example

```jsx
dispatch({ type: "increment" });
```

এরপর:

```jsx
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };

    default:
      return state;
  }
}
```

মনে রাখো:

> **Dispatch বলে কী ঘটেছে, Reducer ঠিক করে State কীভাবে পরিবর্তন হবে।**

---

# 3. তিনটি Core Concept

`useReducer` বুঝতে এই ৩টা অবশ্যই বুঝতে হবে।

## State

যে data আমরা manage করছি।

```js
{ count: 0 }
```

## Action

কী ঘটেছে তার description।

```js
{ type: "increment" }
```

## Reducer

পুরোনো state এবং action নিয়ে নতুন state return করে।

```js
(state, action) => newState
```

### Formula

```text
state + action → reducer → newState
```

---

# 4. Basic Example

```jsx
import { useReducer } from "react";

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };

    case "decrement":
      return { count: state.count - 1 };

    case "reset":
      return { count: 0 };

    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });

  return (
    <div>
      <h2>{state.count}</h2>

      <button onClick={() => dispatch({ type: "increment" })}>
        +
      </button>

      <button onClick={() => dispatch({ type: "decrement" })}>
        -
      </button>

      <button onClick={() => dispatch({ type: "reset" })}>
        Reset
      </button>
    </div>
  );
}
```

---

# 5. `dispatch()` কী?

`dispatch()` reducer-কে একটি action পাঠায়।

```js
dispatch({ type: "increment" });
```

Reducer action receive করে:

```js
function reducer(state, action) {
  // ...
}
```

### Important

`dispatch()` সরাসরি state পরিবর্তন করে না।

```text
dispatch
   ↓
action
   ↓
reducer
   ↓
new state
```

---

# 6. Action কীভাবে লিখবে?

সবচেয়ে common pattern:

```js
{
  type: "increment"
}
```

Data পাঠাতে:

```js
{
  type: "add",
  payload: 5
}
```

তারপর:

```js
case "add":
  return {
    count: state.count + action.payload
  };
```

### Action-এর naming

ভালো:

```js
{ type: "increment" }
{ type: "delete_todo" }
{ type: "form_submitted" }
```

কম ভালো:

```js
{ type: "doSomething" }
```

Action সাধারণত **কী ঘটেছে** সেটা describe করবে।

---

# 7. Payload কী?

`payload` হলো action-এর সাথে পাঠানো extra data।

```js
dispatch({
  type: "add",
  payload: 10
});
```

Reducer:

```js
case "add":
  return {
    count: state.count + action.payload
  };
```

### Object payload

```js
dispatch({
  type: "add_user",
  payload: {
    name: "Sujon",
    age: 24
  }
});
```

---

# 8. Reducer কী?

Reducer হলো একটি function:

```js
function reducer(state, action) {
  // logic
  return newState;
}
```

এর দুটি প্রধান input:

```text
state
action
```

এবং output:

```text
new state
```

### Formula

```js
reducer(state, action) => newState
```

---

# 9. Reducer-এর `switch` pattern

সবচেয়ে common pattern:

```js
function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return { count: state.count + 1 };

    case "decrement":
      return { count: state.count - 1 };

    case "reset":
      return { count: 0 };

    default:
      return state;
  }
}
```

`action.type` দেখে reducer বুঝে কোন logic চালাতে হবে।

---

# 10. `default` কেন দরকার?

Unknown action এ current state return করা উচিত।

```js
default:
  return state;
```

এতে unexpected action এ state নষ্ট হয় না।

---

# 11. State কখনো directly mutate করবে না

### ❌ Wrong

```js
state.count++;
return state;
```

### ✅ Correct

```js
return {
  ...state,
  count: state.count + 1
};
```

কারণ React state immutableভাবে handle করা উচিত।

---

# 12. Object State Update

ধরো:

```js
const initialState = {
  name: "",
  email: "",
  age: 0
};
```

Update:

```js
return {
  ...state,
  name: action.payload
};
```

`...state` পুরোনো properties ধরে রাখে।

---

# 13. Nested Object Update

Nested object হলে প্রতিটি পরিবর্তিত level copy করতে হবে।

```js
const state = {
  user: {
    name: "Sujon",
    address: {
      city: "Sylhet"
    }
  }
};
```

City update:

```js
return {
  ...state,
  user: {
    ...state.user,
    address: {
      ...state.user.address,
      city: "Dhaka"
    }
  }
};
```

### মনে রাখো

> যত গভীরে update করবে, সেই level পর্যন্ত copy করতে হবে।

---

# 14. Array State

`useReducer` array state-এর সাথেও কাজ করে।

```js
const initialState = [];
```

### Add

```js
return [...state, action.payload];
```

### Delete

```js
return state.filter(item => item.id !== action.payload);
```

### Update

```js
return state.map(item =>
  item.id === action.payload
    ? { ...item, done: !item.done }
    : item
);
```

---

# 15. Reducer Pure Function হতে হবে

Reducer ideally **pure function** হবে।

মানে:

> একই `state` + একই `action` দিলে একই result আসবে।

### Reducer-এর মধ্যে avoid করবে

```text
API call
fetch()
setTimeout()
setInterval()
random value
Date.now()
DOM manipulation
localStorage write
```

### Wrong

```js
function reducer(state, action) {
  const id = Date.now();

  return [...state, { id }];
}
```

### Better

ID/action data আগে তৈরি করে dispatch করো:

```js
dispatch({
  type: "add",
  payload: {
    id: Date.now(),
    text: "Learn React"
  }
});
```

Reducer শুধু state calculate করবে।

---

# 16. Side Effect কোথায় করবে?

Side effect সাধারণত event handler বা `useEffect`-এ করবে।

### Example

```jsx
useEffect(() => {
  fetch("/api/users")
    .then(res => res.json())
    .then(data => {
      dispatch({
        type: "success",
        payload: data
      });
    });
}, []);
```

Reducer:

```js
case "success":
  return {
    ...state,
    loading: false,
    data: action.payload
  };
```

---

# 17. `useReducer` + Form

Complex form-এর জন্য useful।

```jsx
const initialState = {
  name: "",
  email: ""
};

function reducer(state, action) {
  switch (action.type) {
    case "change":
      return {
        ...state,
        [action.name]: action.value
      };

    case "reset":
      return initialState;

    default:
      return state;
  }
}
```

Dispatch:

```js
dispatch({
  type: "change",
  name: "email",
  value: "abc@gmail.com"
});
```

---

# 18. `useReducer` + API Fetching

একটি common state:

```js
const initialState = {
  loading: false,
  data: null,
  error: null
};
```

Actions:

```text
FETCH_START
FETCH_SUCCESS
FETCH_ERROR
```

Reducer:

```js
function reducer(state, action) {
  switch (action.type) {
    case "FETCH_START":
      return {
        loading: true,
        data: null,
        error: null
      };

    case "FETCH_SUCCESS":
      return {
        loading: false,
        data: action.payload,
        error: null
      };

    case "FETCH_ERROR":
      return {
        loading: false,
        data: null,
        error: action.payload
      };

    default:
      return state;
  }
}
```

এখানে `loading`, `data`, `error` related হওয়ায় reducer useful।

---

# 19. Lazy Initialization

`useReducer`-এর third argument হিসেবে initialization function দেওয়া যায়।

```js
function init(count) {
  return {
    count: count * 2
  };
}

const [state, dispatch] = useReducer(
  reducer,
  10,
  init
);
```

Initial state হবে:

```js
{
  count: 20
}
```

### Syntax

```js
useReducer(reducer, initialArg, init)
```

`init` initial state তৈরি করে।

---

# 20. `useReducer` + `useContext`

Global/shared state তৈরি করতে ব্যবহার করা যায়।

```jsx
const [state, dispatch] = useReducer(
  reducer,
  initialState
);

<CounterContext.Provider value={{ state, dispatch }}>
  {children}
</CounterContext.Provider>
```

Child component:

```js
const { state, dispatch } = useContext(CounterContext);
```

Flow:

```text
useReducer
    ↓
Context Provider
    ↓
Child Components
```

এতে props drilling কমানো যায়।

---

# 21. `useState` vs `useReducer`

| বিষয় | `useState` | `useReducer` |
|---|---|---|
| Simple state | ✅ | সম্ভব |
| Complex state | সম্ভব | ✅ |
| Multiple update types | কম convenient | ✅ |
| Centralized update logic | ❌ | ✅ |
| Form | Simple form | Complex form |
| Array/Object | সম্ভব | ✅ |
| Testing reducer logic | — | সহজ |
| Code | কম | তুলনামূলক বেশি |

### Simple rule

```text
Simple → useState

Complex → useReducer
```

---

# 22. কখন `useReducer` ব্যবহার করা উচিত?

নিচের situation-গুলোতে consider করবে:

- অনেক ধরনের state update আছে
- Related multiple state values আছে
- Complex form
- Todo application
- Shopping cart
- API loading/success/error
- Multi-step form
- Game state
- Complex UI state
- `useContext` এর সাথে shared state

---

# 23. কখন `useReducer` ব্যবহার না করাই ভালো?

যদি state খুব simple হয়:

```js
const [isOpen, setIsOpen] = useState(false);
```

অথবা:

```js
const [name, setName] = useState("");
```

তাহলে `useReducer` ব্যবহার করলে অপ্রয়োজনীয় code বাড়তে পারে।

---

# 24. `dispatch` সম্পর্কে গুরুত্বপূর্ণ বিষয়

`dispatch`-কে সাধারণত component থেকে call করা হয়:

```js
dispatch({
  type: "increment"
});
```

Reducer-এর ভিতর থেকে আবার `dispatch()` করা উচিত নয়।

Reducer-এর কাজ হলো:

```text
Input → Calculate → Return new state
```

---

# 25. Dispatch-এর পরে state সঙ্গে সঙ্গে পরিবর্তন হয় না

এভাবে ভাববে না:

```js
dispatch({ type: "increment" });

console.log(state.count);
```

এখানে পুরোনো state দেখা যেতে পারে, কারণ React state update process করে এবং তারপর re-render করে।

Flow:

```text
dispatch()
   ↓
state update scheduled
   ↓
re-render
   ↓
new state available
```

---

# 26. Reducer component-এর বাইরে রাখা

Recommended:

```js
function reducer(state, action) {
  // ...
}

function App() {
  const [state, dispatch] = useReducer(
    reducer,
    initialState
  );

  return <div>...</div>;
}
```

এতে reducer আলাদা রাখা যায় এবং test করাও সহজ হয়।

---

# 27. Reducer আলাদা file-এ রাখা

বড় project-এ:

```text
src/
├── components/
│   └── Counter.jsx
├── reducers/
│   └── counterReducer.js
└── App.jsx
```

`counterReducer.js`:

```js
export const initialState = {
  count: 0
};

export function counterReducer(state, action) {
  switch (action.type) {
    case "increment":
      return {
        ...state,
        count: state.count + 1
      };

    default:
      return state;
  }
}
```

Component:

```js
import {
  counterReducer,
  initialState
} from "./reducers/counterReducer";
```

---

# 28. Multiple Actions

একটি reducer-এ অনেক action থাকতে পারে।

```js
switch (action.type) {
  case "add":
    // ...

  case "remove":
    // ...

  case "update":
    // ...

  case "clear":
    // ...

  case "reset":
    // ...

  default:
    return state;
}
```

এটাই `useReducer`-এর বড় সুবিধাগুলোর একটি।

---

# 29. Action Type Constants

বড় project-এ typo কমানোর জন্য constants ব্যবহার করা যায়।

```js
const ACTIONS = {
  INCREMENT: "increment",
  DECREMENT: "decrement",
  RESET: "reset"
};
```

তারপর:

```js
dispatch({
  type: ACTIONS.INCREMENT
});
```

Reducer:

```js
case ACTIONS.INCREMENT:
  return {
    count: state.count + 1
  };
```

---

# 30. TypeScript-এর সাথে `useReducer`

TypeScript-এ state এবং action-এর type define করা যায়।

```tsx
type State = {
  count: number;
};

type Action =
  | { type: "increment" }
  | { type: "decrement" }
  | { type: "add"; payload: number };

function reducer(
  state: State,
  action: Action
): State {
  switch (action.type) {
    case "increment":
      return {
        count: state.count + 1
      };

    case "decrement":
      return {
        count: state.count - 1
      };

    case "add":
      return {
        count: state.count + action.payload
      };

    default:
      return state;
  }
}
```

এতে ভুল action বা ভুল payload অনেক আগেই ধরা যায়।

---

# 31. Common Mistakes

### ❌ State mutate করা

```js
state.count++;
```

### ❌ নতুন state return না করা

```js
case "increment":
  state.count++;
```

### ❌ Unknown action-এ `undefined` return করা

```js
default:
  return;
```

### ✅ Correct

```js
default:
  return state;
```

### ❌ Reducer-এর মধ্যে API call

```js
function reducer(state, action) {
  fetch("/api");
}
```

### ❌ Action-এ unnecessary complex logic

Action ideally simple data বহন করবে:

```js
dispatch({
  type: "add",
  payload: 5
});
```

---

# 32. `useReducer` শেখার জন্য Recommended Order

এই order-এ শিখলে সহজ হবে:

```text
1. useState
     ↓
2. State
     ↓
3. Action
     ↓
4. Reducer
     ↓
5. dispatch
     ↓
6. switch + action.type
     ↓
7. payload
     ↓
8. Object state
     ↓
9. Array state
     ↓
10. Form
     ↓
11. API state
     ↓
12. Lazy initialization
     ↓
13. useReducer + useContext
     ↓
14. TypeScript
```

---

# 33. Interview-এর জন্য Important Questions

### Q1. `useReducer` কী?

Complex state এবং state update logic manage করার React Hook।

### Q2. `useReducer` কেন ব্যবহার করি?

যখন state বা state update logic complex হয় এবং update logic এক জায়গায় রাখতে চাই।

### Q3. `reducer` কী?

একটি function যা:

```text
current state + action → new state
```

return করে।

### Q4. `dispatch` কী?

Reducer-এ action পাঠানোর function।

### Q5. `action` কী?

কী ঘটেছে তার description।

### Q6. `payload` কী?

Action-এর সাথে পাঠানো additional data।

### Q7. Reducer pure হওয়া কেন দরকার?

Predictable এবং সহজে testable state updates পাওয়ার জন্য।

### Q8. `useState` নাকি `useReducer`?

```text
Simple state → useState
Complex state → useReducer
```

### Q9. `useReducer` কি global state management tool?

নিজে global নয়। তবে `useContext`-এর সাথে combine করে shared/global-like state management করা যায়।

---

# 34. সবচেয়ে গুরুত্বপূর্ণ Cheat Sheet

```text
useReducer
│
├── state       → current data
│
├── action      → কী ঘটেছে
│
├── dispatch    → action পাঠায়
│
├── reducer     → state update করার logic
│
└── initialState → starting data
```

### Main Formula

```text
dispatch(action)
      ↓
reducer(state, action)
      ↓
newState
      ↓
re-render
```

### মনে রাখার Shortcut

> **State = কী আছে**  
> **Action = কী ঘটেছে**  
> **Dispatch = খবর পাঠায়**  
> **Reducer = কী পরিবর্তন হবে ঠিক করে**

---

# 35. Final Example — সব Concept একসাথে

```jsx
import { useReducer } from "react";

const initialState = {
  count: 0
};

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return {
        ...state,
        count: state.count + 1
      };

    case "decrement":
      return {
        ...state,
        count: state.count - 1
      };

    case "add":
      return {
        ...state,
        count: state.count + action.payload
      };

    case "reset":
      return initialState;

    default:
      return state;
  }
}

function Counter() {
  const [state, dispatch] = useReducer(
    reducer,
    initialState
  );

  return (
    <div>
      <h2>{state.count}</h2>

      <button
        onClick={() =>
          dispatch({ type: "increment" })
        }
      >
        +
      </button>

      <button
        onClick={() =>
          dispatch({ type: "decrement" })
        }
      >
        -
      </button>

      <button
        onClick={() =>
          dispatch({
            type: "add",
            payload: 5
          })
        }
      >
        Add 5
      </button>

      <button
        onClick={() =>
          dispatch({ type: "reset" })
        }
      >
        Reset
      </button>
    </div>
  );
}

export default Counter;
```

---

# 🎯 One-Minute Revision

```text
useReducer = Complex State Management

useReducer(reducer, initialState)

State      → current data
Action     → কী ঘটেছে
Dispatch   → action পাঠায়
Reducer    → নতুন state তৈরি করে
Payload    → extra data

Flow:
Event
 ↓
dispatch(action)
 ↓
reducer(state, action)
 ↓
new state
 ↓
re-render

Simple state  → useState
Complex state → useReducer

Reducer:
✅ Pure
✅ Immutable update
✅ default case
❌ API call
❌ state mutation
❌ side effects
```

> **সবচেয়ে important:**  
> `useReducer` মুখস্থ করার চেয়ে এই flow-টা বুঝো:
>
> **`dispatch → action → reducer → new state → re-render`**
