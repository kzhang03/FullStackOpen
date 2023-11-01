>[!info]
> Tags: #React #JavaScript #States #Debugging
>
> Relevant: [[Introduction to React]] 

## Complex State

If our application requires a <span style="color:#ac75ea">more complex state</span>, in most cases the best way to accomplish this is by using the `useState` <span style="color:#ac75ea">multiple</span> times to create <span style="color:#ac75ea">separate</span> "pieces" of state

The following, we create <span style="color:#ac75ea">two pieces</span> of state names `left` and `right`, both initialized to 0

```js
const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)

  return (
    <div>
      {left}
      <button onClick={() => setLeft(left + 1)}>
        left
      </button>
      <button onClick={() => setRight(right + 1)}>
        right
      </button>
      {right}
    </div>
  )
}
```

The component has <span style="color:#ac75ea">access</span> to the functions `setLeft` and `SetRight` 

Since the component's state can be <span style="color:#ac75ea">any</span> data type, we implement both click counts into a single object

```js
{
  left: 0,
  right: 0
}
```

<b><span style="color:#ac75ea">App.jsx</span></b>
```js
const App = () => {
  const [clicks, setClicks] = useState(
	{
	  left: 0, 
	  right: 0
    }
  )

  const handleLeftClick = () => {
    const newClicks = { 
      left: clicks.left + 1, 
      right: clicks.right 
    }
    setClicks(newClicks)
  }

  const handleRightClick = () => {
    const newClicks = { 
      left: clicks.left, 
      right: clicks.right + 1 
    }
    setClicks(newClicks)
  }

  return (
    <div>
      {clicks.left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {clicks.right}
    </div>
  )
}
```

We can define the new state object more <span style="color:#ac75ea">neatly</span> by using the [object spread](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax) syntax 

```js
const handleLeftClick = () => {
  const newClicks = { 
    ...clicks, 
    left: clicks.left + 1 
  }
  setClicks(newClicks)
}

const handleRightClick = () => {
  const newClicks = { 
    ...clicks, 
    right: clicks.right + 1 
  }
  setClicks(newClicks)
}
```

In practice, `{ ...clicks }` creates a <span style="color:#ac75ea">new</span> object with all <span style="color:#ac75ea">properties</span> of the `clicks` object

```js
{ ...clicks, right: clicks.right + 1 }
```

The code above creates a <span style="color:#ac75ea">copy</span> of the `clicks` object where the <span style="color:#ac75ea">value</span> of the `right` property is increased by one

Assigning the objects to a <span style="color:#ac75ea">variable</span> is not nescessary, thus we simplify the functions

```js
const handleLeftClick = () =>
  setClicks({ ...clicks, left: clicks.left + 1 })

const handleRightClick = () =>
  setClicks({ ...clicks, right: clicks.right + 1 })
```

Why can't we just do <span style="color:#ac75ea">this</span>?

```js
const handleLeftClick = () => {
  clicks.left++
  setClicks(clicks)
}
```

The application will work, however, <b><span style="color:#ac75ea">it is forbidden in React to mutate states</span></b> directly as [it can result in unexpected side effects](https://stackoverflow.com/a/40309023)

Changing states is always done by <span style="color:#ac75ea">setting</span> the state to a new object

If properties of the previous state object is <span style="color:#ac75ea">unchanged</span>, it needs to be copied into a <span style="color:#ac75ea">new object</span>and becoming the new state

In this application, storing all the states as a single object is a <span style="color:#ac75ea">bad choice</span> as it increases <span style="color:#ac75ea">complexity</span> with no benefits

However, there are <span style="color:#ac75ea">situations</span> where it is <span style="color:#ac75ea">beneficial</span> to store all states in a complex data structure

## Handling Arrays

Now, we add a piece of state to <b><span style="color:#ac75ea">App.jsx</span></b> containing an array `allClicks` that remembers every click that occurred

```js
const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  
  const handleLeftClick = () => {    
    setAll(allClicks.concat('L'))    
    setLeft(left + 1)  
  }
  const handleRightClick = () => {    
    setAll(allClicks.concat('R'))    
    setRight(right + 1)  
  }
  return (
    <div>
      {left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {right}
      <p>{allClicks.join(' ')}</p>    
    </div>
  )
}
```

Adding new items to `allClicks` is <span style="color:#ac75ea">accomplished</span> through [concat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/concat) which returns a new copy of the array 

It is possible to <span style="color:#ac75ea">accomplish</span> the same task using [push](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push) however, the state of React components like `allClicks` must <span style="color:#ac75ea">NOT</span> be mutated directly even if it appears to work

```js
const App = () => {
  // ...

  return (
    <div>
      {left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {right}
      <p>{allClicks.join(' ')}</p>    </div>
  )
}
```

Finally, the [join](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/join) method is used to join everything in `allClicks` into a <span style="color:#ac75ea">single string</span> separated by a space

## Update of the State is Asynchronous

We <span style="color:#ac75ea">expand</span> the application with a new state `total` which keeps track of <span style="color:#ac75ea">total</span> button presses

```js
const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)
  
  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
    setTotal(left + right)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
    setTotal(left + right)  
  }

  return (
    <div>
      {left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {right}
      <p>{allClicks.join(' ')}</p>
      <p>total {total}</p>    </div>
  )
}
```

However, we see that the <span style="color:#ac75ea">total number</span> of button presses is <span style="color:#ac75ea">consistently</span> one less than the actual amount of presses

Adding `console.log()` reveals that even though a <span style="color:#ac75ea">new value</span> is set for either of the counters through `setLeft or setRight`, the old value <span style="color:#ac75ea">persists</span> despite the update

Thus, total <span style="color:#ac75ea">displays</span> a result that is too small

The reason for this is that a state <span style="color:#ac75ea">update</span> in React happens [asynchronously](https://react.dev/learn/queueing-a-series-of-state-updates), i.e., not immediately but at some point <span style="color:#ac75ea">before</span> the component is rendered again

However, the fix is <span style="color:#ac75ea">easy</span>

```js
const App = () => {
  // ...
  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    const updatedLeft = left + 1
    setLeft(updatedLeft)
    setTotal(updatedLeft + right) 
  }

  // ...
}
```

## Conditional Rendering

Let's <span style="color:#ac75ea">modify</span> the app do that the rendering of the clicking history is <span style="color:#ac75ea">handled</span> by a new `History`component

```js
const History = (props) => {  
  if (props.allClicks.length === 0) {    
    return (      
      <div>        
        the app is used by pressing the buttons      
      </div>    
      )  
  }  
  return (    
    <div>      
      button press history: {props.allClicks.join(' ')}    
    </div>  
    )
  }
  
const App = () => {
  // ...

  return (
    <div>
      {left}
      <button onClick={handleLeftClick}>left</button>
      <button onClick={handleRightClick}>right</button>
      {right}
      <History allClicks={allClicks} />    
    </div>
  )
}
```

Due to the `if` statement in `History`, the component renders <span style="color:#ac75ea">completely</span> different React elements depending on the state. This is called <b><span style="color:#ac75ea">conditional rendering</span></b>

Let's make one last <span style="color:#ac75ea">modification</span> to our app by refactoring it to use the `Button` component we defined early on

```js
const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }

  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const Button = ({ handleClick, text }) => (  
  <button onClick={handleClick}>    
    {text}  
  </button>
)

const App = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }

  return (
    <div>
      {left}
      <Button handleClick={handleLeftClick} text='left' />      
      <Button handleClick={handleRightClick} text='right' />      
      {right}
      <History allClicks={allClicks} />
    </div>
  )
}
```

## Old React

We used <span style="color:#ac75ea">state hooks</span> to add state to React components which is a <span style="color:#ac75ea">feature</span> of newer versions of React ([v16.8.0](https://www.npmjs.com/package/react/v/16.8.0) onwards) 

Before that, there was <span style="color:#ac75ea">no way</span> of adding state to components. They had to be defined as [class](https://react.dev/reference/react/Component) components using JavaScript class syntax

It is still essential to learn the class syntax as many lines of legacy React code still exists

## Debugging React Applications

Before anything, let us remind ourselves of one of the <span style="color:#ac75ea">most</span> <span style="color:#ac75ea">important</span> rules of web dev:

<b><span style="color:#ac75ea">Keep the browser's developer console open at all times</span></b>

Now, lets suppose `Button` isn't functioning <span style="color:#ac75ea">properly</span>
```js
const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>
    {text}
  </button>
)
```

```js
const Button = (props) => { 
  console.log(props)  const { handleClick, text } = props
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}
```

We <span style="color:#ac75ea">transform</span> the function into a less compact form and receive the entire props object without destructuring

Through this, we are able to <span style="color:#ac75ea">print</span> variables to check if any errors are present

> [!note] Objects in Console
> When using `console.log` for debugging, <span style="color:#ac75ea">separate</span> the things you want to log with a comma
> 
> `console.log('props value is', props)`

Another <span style="color:#ac75ea">method</span> of debugging applications is using Chrome developer console's debugger which <span style="color:#ac75ea">pauses</span> the execution of your application code by writing the command [debugger](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/debugger)anywhere in your code

The execution will <span style="color:#ac75ea">pause</span> once it arrives where `debugger` gets executed

![](https://fullstackopen.com/static/4a4bced189180676ff4019f459be833e/5a190/7a.png)

By going to the <span style="color:#ac75ea">Console</span> tab, it is easy to inspect the current state of variables

![](https://fullstackopen.com/static/5ba1388f4d17134dcfc62fbeb2251421/5a190/8a.png)

Once the bug is <span style="color:#ac75ea">discovered</span>, remove the `debugger` command and refresh the page

The debugger also enables us to execute code line by line with controls found on the <span style="color:#ac75ea">Sources</span> tab

It is also possible to access the debugger without the `debugger` command by adding breakpoints in the <span style="color:#ac75ea">Sources</span> tab

Inspecting the <span style="color:#ac75ea">values</span> of the component's variables can be done in the `Scope` section

![](https://fullstackopen.com/static/c8c143bb940ecd99aea4dc4a1c0239f2/5a190/9a.png)

It's highly recommended to add [React developer tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi) extension

## Rules of Hooks

There are <span style="color:#ac75ea">limitations</span> and <span style="color:#ac75ea">rules</span> to be followed to ensure that our app uses hook-based state functions correctly

The `useState` and `useEffect` function <b><span style="color:#ac75ea">must not be called</span></b> from inside of a loop, a conditional expression, or any place that is not a function defining a component

This ensures that hooks are always called in the <span style="color:#ac75ea">same order</span>, otherwise the app behaves erratically

```js
const App = () => {
  // these are ok
  const [age, setAge] = useState(0)
  const [name, setName] = useState('Juha Tauriainen')

  if ( age > 10 ) {
    // this does not work!
    const [foobar, setFoobar] = useState(null)
  }

  for ( let i = 0; i < age; i++ ) {
    // also this is not good
    const [rightWay, setRightWay] = useState(false)
  }

  const notGood = () => {
    // and this is also illegal
    const [x, setX] = useState(-1000)
  }

  return (
    //...
  )
}
```

## Event Handling Revisited

Suppose we're developing a <span style="color:#ac75ea">new</span> app with the following component

<b><span style="color:#ac75ea">App.jsx</span></b>
```js
const App = () => {
  const [value, setValue] = useState(10)

  return (
    <div>
      {value}
      <button>reset to zero</button>
    </div>
  )
}
```

We want the button to <span style="color:#ac75ea">reset</span> the state stored in the `value` variable

To do this, we add an <span style="color:#ac75ea">event handler</span> to the button

>[!note] Event Handlers
>Event Handlers must <span style="color:#ac75ea">always</span> be a function or a reference to a function

```js
<button onClick={() => console.log('clicked the button')}>
  button
</button>
```

```js
<button onClick={() => setValue(0)}>button</button>
```

Often, the `handleClick` variable gets <span style="color:#ac75ea">defined</span> as a function inside of the component

```js
const App = () => {
  const [value, setValue] = useState(10)

  const handleClick = () =>
    console.log('clicked the button')

  return (
    <div>
      {value}
      <button onClick={handleClick}>button</button>
    </div>
  )
}
```

## A Function that Returns a Function

Another way to <span style="color:#ac75ea">define</span> an event handler is to use <span style="color:#ac75ea">a function that returns a function</span>

We make the <span style="color:#ac75ea">changes</span>
```js
const App = () => {
  const [value, setValue] = useState(10)

  const hello = () => {    
    const handler = () => console.log('hello world')    
    return handler  
  }
  return (
    <div>
      {value}
      <button onClick={hello()}>button</button>
    </div>
  )
}
```

Earlier, we stated that an event handler may <span style="color:#ac75ea">not</span> be a call to a function but rather a function or a reference to a function

However, the `hello()` <span style="color:#ac75ea">return value</span> is another function assigned to the `handler` variable

Thus, when `<button onClick={hello()}>button</button>` is rendered, it assigns return value of `hello()` to the <span style="color:#ac75ea">onClick</span> attribute

It is <span style="color:#ac75ea">equivalent</span> to 

```js
<button onClick={() => console.log('hello world')}>
  button
</button>
```

Now, we <span style="color:#ac75ea">change</span> the code slightly

```js
const App = () => {
  const [value, setValue] = useState(10)

  const hello = (who) => {    
    const handler = () => {      
      console.log('hello', who)    
    }    
    return handler  
  }
  
  return (
    <div>
      {value}
      <button onClick={hello('world')}>button</button>      
      <button onClick={hello('react')}>button</button>      
      <button onClick={hello('function')}>button</button>    
    </div>
  )
}
```

We are able to <span style="color:#ac75ea">compact</span> `hello` into an arrow function

```js
const hello = (who) => () => {
  console.log('hello', who)
}
```

We can use this trick to set the <span style="color:#ac75ea">state</span> of a component

```js
const App = () => {
  const [value, setValue] = useState(10)
  
  const setToValue = (newValue) => () => {    
    console.log('value now', newValue)     
    setValue(newValue)  
  }  
  
  return (
    <div>
      {value}
      <button onClick={setToValue(1000)}>thousand</button>      
      <button onClick={setToValue(0)}>reset</button>      
      <button onClick={setToValue(value + 1)}>increment</button>    
    </div>
  )
}
```

## Passing Event Handlers to Child Components

Let's extract `Button` into its <span style="color:#ac75ea">own</span> component (separate from <b><span style="color:#ac75ea">App.jsx</span></b>)

```js
const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)
```

The component gets a <span style="color:#ac75ea">handler function</span> from the `handleClick` prop. Thus we make changes

```js
const App = (props) => {
  // ...
  return (
    <div>
      {value}
      <Button handleClick={() => setToValue(1000)} text="thousand" />      
      <Button handleClick={() => setToValue(0)} text="reset" />      
	  <Button handleClick={() => setToValue(value + 1)} text="increment" />   
	</div>
  )
}
```

## Do Not Define Components Within Components

We <span style="color:#ac75ea">display</span> the value in a new `Display` component

```js
// This is the right place to define a component
const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  const [value, setValue] = useState(10)

  const setToValue = newValue => {
    console.log('value now', newValue)
    setValue(newValue)
  }

  // Do not define components inside another component
  const Display = props => <div>{props.value}</div>
  
  return (
    <div>
      <Display value={value} />
      <Button handleClick={() => setToValue(1000)} text="thousand" />
      <Button handleClick={() => setToValue(0)} text="reset" />
      <Button handleClick={() => setToValue(value + 1)} text="increment" />
    </div>
  )
}
```

The application seems to work, but <b><span style="color:#ac75ea">don't implement components like this</span></b>!

The method provides <span style="color:#ac75ea">no</span> benefits and leads to <span style="color:#ac75ea">unpleasant</span> problems

Notably, React treats a component <span style="color:#ac75ea">defined</span> inside another component as a new component <span style="color:#ac75ea">every render</span>, making it impossible for React to optimize the code

Thus, we <span style="color:#ac75ea">fix</span> the issue

```js
const Display = props => <div>{props.value}</div>

const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const App = () => {
  const [value, setValue] = useState(10)

  const setToValue = newValue => {
    console.log('value now', newValue)
    setValue(newValue)
  }

  return (
    <div>
      <Display value={value} />
      <Button handleClick={() => setToValue(1000)} text="thousand" />
      <Button handleClick={() => setToValue(0)} text="reset" />
      <Button handleClick={() => setToValue(value + 1)} text="increment" />
    </div>
  )
}
```

