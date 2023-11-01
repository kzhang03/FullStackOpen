>[!info]
>Tags: #JavaScript #React #States #Event-Handlers #documentation/useState 
>
>Relevant: [[Introduction to React]] 

## Component Helper Functions

```js
const Hello = (props) => {
  const bornYear = () => {    
	const yearNow = new Date().getFullYear()    
	return yearNow - props.age  
  }
  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>    
    </div>
  )
}
```

The helper function is defined inside of another function that defines the behavior of a component

## Destructuring

A useful feature of JavaScript that was added in the ES6 specification allows us to [destructure](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment) values from <span style="color:#ac75ea">objects</span> and <span style="color:#ac75ea">arrays</span> on assignment

Previously, props is passed as an object with <span style="color:#ac75ea">name</span> and <span style="color:#ac75ea">age</span>

```js
props = {
  name: 'Arto Hellas',
  age: 35,
}
```

and so we can <span style="color:#ac75ea">streamline</span> our component by assigning the values of the properties directly into `name` and `age` 

```js
const Hello = (props) => {
  const name = props.name  
  const age = props.age
  const bornYear = () => new Date().getFullYear() - age
  return (
    <div>
      <p>Hello {name}, you are {age} years old</p>      
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}
```

>[!note]
> bornYear is condensed into an arrow function due to it consisting of a <span style="color:#ac75ea">single expression</span>
> 
> Refer to [[JavaScript Basics#Functions]] for further information

<span style="color:#ac75ea">Destructuring</span> makes the assignment of variables easier as it gathers the values of an object's properties into separate variables

```js
const Hello = (props) => {
  const { name, age } = props  
  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
      <p>Hello {name}, you are {age} years old</p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}
```

We can take destructuring a <span style="color:#ac75ea">step further</span>

```js
const Hello = ({ name, age }) => {  
  const bornYear = () => new Date().getFullYear() - age

  return (
    <div>
      <p>
        Hello {name}, you are {age} years old
      </p>
      <p>So you were probably born in {bornYear()}</p>
    </div>
  )
}
```

The props that are passed to the components are now <span style="color:#ac75ea">directly</span> destructuring into the variables.

## Page Re-rendering

So far, all apps created have been such that the appearance <span style="color:#ac75ea">remains the same</span> after initial rendering

Suppose we wanted to create a counter with the value <span style="color:#ac75ea">increasing</span> every time a button is pressed

<b><span style="color:#ac75ea">App.jsx</span></b>
```js
const App = (props) => {
  const {counter} = props
  return (
    <div>{counter}</div>
  )
}

export default App
```

<b><span style="color:#ac75ea">main.jsx</span></b>
```js
import ReactDOM from 'react-dom/client'

import App from './App'

let counter = 1

ReactDOM.createRoot(document.getElementById('root')).render(
  <App counter={counter} />
)
```

From this, counter will <span style="color:#ac75ea">not</span> change even if we were to add

``` js
count += 1
```

The component won't <span style="color:#ac75ea">re-render</span>

We can, however, get the component to <span style="color:#ac75ea">re-render</span> by calling the `render` method

```js
let counter = 1

const refresh = () => {
  ReactDOM.createRoot(document.getElementById('root')).render(
    <App counter={counter} />
  )
}

refresh()
counter += 1
refresh()
counter += 1
refresh()
```

Now the component renders <span style="color:#ac75ea">three times</span>, with counter ending with a value of 3

We can implement more interesting functionality by re-rendering and incrementing the counter<span style="color:#ac75ea"> every second</span> through [setInterval](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setInterval)

```js
setInterval(() => {
  refresh()
  counter += 1
}, 1000)
```

However, making repeated calls to the `render` method is <span style="color:#ac75ea">not</span> the recommended way to re-render components

## Stateful Component

All of our components up till now have not contained any state that could <span style="color:#ac75ea">change</span> during runtime

Thus, we incorporate React's [state hook](https://react.dev/learn/state-a-components-memory)

<b><span style="color:#ac75ea">App.jsx</span></b>
```js
import { useState } from 'react'

const App = () => {
  const [ counter, setCounter ] = useState(0)
  setTimeout(    
    () => setCounter(counter + 1),    
    1000  
  )
  return (
    <div>{counter}</div>
  )
}

export default App
```

<b><span style="color:#ac75ea">main.jsx</span></b>
```js
import ReactDOM from 'react-dom/client'

import App from './App'

ReactDOM.createRoot(document.getElementById('root')).render(<App />)
```

We focus on `const [counter, setCounter] = useState(0)` located in <b><span style="color:#ac75ea">App.jsx</span></b> 

### useState

The function call adds <span style="color:#ac75ea">state</span> to the component and in the case above, renders it <span style="color:#ac75ea">initialized</span> with the value of zero

> [!note] State Variables
>  A state variable in React is a variable maintained within a component and determine how it <span style="color:#ac75ea">renders</span> and <span style="color:#ac75ea">behaves</span>
>  
>  When the value of the state variable changes, the component <span style="color:#ac75ea">re-renders</span>
>  
>  The data type held by the state variable can be <span style="color:#ac75ea">anything</span> (including objects)

useState always returns an array with two elements 
<span style="color:#ac75ea">First Element</span> - Current value of state variable (i.e., count)
<span style="color:#ac75ea">Second Element</span> - A function to update the value of the state variable (i.e., setCount)

The code above calls [setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout) and passes two parameters:
- a function to increment the counter state
- a timeout of one second

```js
setTimeout(
  () => setCounter(counter + 1),
  1000
)
```

>[!note] setTimeout
>The code above gives the instructions "after 1000 milliseconds, <span style="color:#ac75ea">execute</span> the function"

Each time `setCounter` is called, React <span style="color:#ac75ea">re-renders</span> the component

This means that the function body of the component function gets <span style="color:#ac75ea">re-executed</span>

```js
() => {
  const [ counter, setCounter ] = useState(0)

  setTimeout(
    () => setCounter(counter + 1),
    1000
  )

  return (
    <div>{counter}</div>
  )
}
```

The second time the component function is executed, `useState()` and <span style="color:#ac75ea">returns</span> the new value of the state, 1

Executing the function body again creates <span style="color:#ac75ea">another</span> timeout and increments `counter` state again

The value of `counter` is now 2 but the old value, 1, is <span style="color:#ac75ea">rendered</span> to the screen due to [setTimeout](https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout) waiting one second 

Thus, every time the value of the state variable is <span style="color:#ac75ea">modified</span>, the component re-renders

## Event Handling

A user's <span style="color:#ac75ea">interaction</span> with a webpage should result changes and events being triggered

Buttons support [mouse events](https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent) of which <span style="color:#ac75ea">clicking</span> is the most common

```js
const App = () => {
  const [ counter, setCounter ] = useState(0)

  const handleClick = () => {    
    console.log('clicked')  
  }
  return (
    <div>
      <div>{counter}</div>
      <button onClick={handleClick}>
        plus
      </button>    
    </div>
  )
}
```

Every click of the <span style="color:#ac75ea">plus</span> button causes `handleClick` to be called

Since `handleClick` only has <span style="color:#ac75ea">one</span> expression, it can be defined <span style="color:#ac75ea">directly</span> in the value assignment of the onClick-attribute

```js
const App = () => {
  const [ counter, setCounter ] = useState(0)

  return (
    <div>
      <div>{counter}</div>
      <button onClick={() => console.log('clicked')}>        
        plus
      </button>
    </div>
  )
}
```

Adding `useState` to our buttons, we create a <span style="color:#ac75ea">counter</span> that increases on click

```js
const App = () => {
  const [ counter, setCounter ] = useState(0)

  return (
    <div>
      <div>{counter}</div>
      <button onClick={() => setCounter(counter + 1)}>
        plus
      </button>
      <button onClick={() => setCounter(0)}>         
        zero      
      </button>    
    </div>
  )
}
```

## A Event Handler is a Function

Attempting to <span style="color:#ac75ea">simplify</span> our `onClick` attributes this way completely breaks our application

```js
<button onClick={() => setCounter(counter + 1)}> 
  plus
</button>
```
```js
<button onClick={setCounter(counter + 1)}> 
  plus
</button>
```

This is due to the fact that the event handler is a<span style="color:#ac75ea"> function call</span>

Thus, <span style="color:#ac75ea">every time</span> React renders the component, it executes the function call `setCounter`, which in turn re-renders the component creating an <span style="color:#ac75ea">infinite loop</span>

>[!warning]
>Usually, defining event handlers within JSX-templates is <span style="color:#ac75ea">not</span> a good idea
>
>In the code above it's <span style="color:#ac75ea">tolerated</span> because our event handlers are so <span style="color:#ac75ea">simple</span>

We <span style="color:#ac75ea">separate</span> the event handlers into separate functions

```js
const App = () => {
  const [ counter, setCounter ] = useState(0)

  const increaseByOne = () => setCounter(counter + 1)    
  const setToZero = () => setCounter(0)
  return (
    <div>
      <div>{counter}</div>
      <button onClick={increaseByOne}>        
	    plus
      </button>
      <button onClick={setToZero}>        
        zero
      </button>
    </div>
  )
}
```

Here, the value of the onClick <span style="color:#ac75ea">attribute</span> is a variable containing a <span style="color:#ac75ea">reference</span> to a function

## Passing State - to Child Components

It's <span style="color:#ac75ea">recommended</span> to write React components that are small and reusable 

One of the best practice in React is to [lift the state up](https://react.dev/learn/sharing-state-between-components) in the component hierarchy

The <span style="color:#ac75ea">documentation</span> says:
	_Often, several components need to reflect the same changing data. We recommend lifting the shared state up to their closest common ancestor._

From this, we <span style="color:#ac75ea">refactor</span> our application into three smaller components for (two) buttons and displaying the counter

<b><span style="color:#ac75ea">App.jsx</span></b>
```js
const Display = (props) => {
  return (
    <div>{props.counter}</div>
  )
}

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const App = () => {
  const [ counter, setCounter ] = useState(0)

  const increaseByOne = () => setCounter(counter + 1)
  const decreaseByOne = () => setCounter(counter - 1) 
  const setToZero = () => setCounter(0)

  return (
    <div>
      <Display counter={counter}/>
      <Button 
	    handleClick={increaseByOne} 
	    text='plus'
	   />      
      <Button 
	    handleClick={setToZero}        
	    text='zero'      
	    />           
	  <Button        
	    handleClick={decreaseByOne}        
	    text='minus'      
	    />               
	</div>
  )
}
```

Since we have an easily <span style="color:#ac75ea">reusable</span> Button component, we can easily add a new button

## Changes in State cause Re-rendering

We go over the <span style="color:#ac75ea">main principles</span> of how an application works

When the app starts, the code in <b><span style="color:#ac75ea">App.jsx</span></b> is executed. In this case it uses a [useState](https://react.dev/reference/react/useState) hook to create the app state and <span style="color:#ac75ea">set</span> an initial value for `counter`

<b><span style="color:#ac75ea">App.jsx</span></b> contains the `Display` and `Button` components which <span style="color:#ac75ea">displays</span> the counter and buttons

If a button is <span style="color:#ac75ea">clicked</span>, an event handler is executed which changes the <span style="color:#ac75ea">state</span> of the `App` component with the `setCounter` function

Remember that <b><span style="color:#ac75ea">calling a function that changes the state causes the component to re-render</span></b> 
So, if a user clicks the <span style="color:#ac75ea">plus</span> button, it's event handler <span style="color:#ac75ea">changes</span> `counter` to 1 and the `App` component is re-rendered

This causes its <span style="color:#ac75ea">subcomponents</span> `Display` and all `Button` to also be re-rendered

`Display` <span style="color:#ac75ea">receives</span> the new value of 1 if the button adds 1 to `counter` and <span style="color:#ac75ea">renders</span> it

<b><span style="color:#ac75ea">App.jsx</span></b>
```js
const App = () => {
  const [counter, setCounter] = useState(0)
  console.log('rendering with counter value', counter)
  const increaseByOne = () => {
    console.log('increasing, value before', counter)    
    setCounter(counter + 1)
  }

  const decreaseByOne = () => { 
    console.log('decreasing, value before', counter)    
    setCounter(counter - 1)
  }

  const setToZero = () => {
    console.log('resetting to zero, value before', counter)    
    setCounter(0)
  }

  return (
    <div>
      <Display counter={counter} />
      <Button handleClick={increaseByOne} text="plus" />
      <Button handleClick={setToZero} text="zero" />
      <Button handleClick={decreaseByOne} text="minus" />
    </div>
  )
} 
```

## Refactoring the Components

The component `Display` only uses `counter` as its <span style="color:#ac75ea">props</span>

Thus we can <span style="color:#ac75ea">simplify</span> the component by using [destructuring](https://fullstackopen.com/en/part1/component_state_event_handlers#destructuring)

```js
const Display = ({ counter }) => {
  return (
    <div>{counter}</div>
  )
}
```

However, since it <span style="color:#ac75ea">contains</span> the return statement only, it is possible to <span style="color:#ac75ea">convert</span> it into an arrow function

```js
const Display = ({ counter }) => <div>{counter}</div>
```

We are able to <span style="color:#ac75ea">simplify</span> the component `Button` as well

```js
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)
```

>[!warning] Oversimplifying
>Be careful to not <span style="color:#ac75ea">oversimplify</span> components as adding complexity to it in the future will become tedious

