const Header = ({ header }) => {
  return <h1>{header}</h1>
}

const Total = ({ part }) => {
  const arr = part.map(section => section.exercises)
  const total = arr.reduce((acc, val) => acc + val, 0)
  return (
    <b>total of {total} exercises</b>
  )
}

const Content = ({ part }) => {
  return (
    part.map((section, i) => 
      <div key={i}>
        {section.name} {section.exercises}
      </div>
    )
  )
}

const Course = ({ course }) => {
  return (
    <div>
      <Header header={course.name} />
      <Content part={course.parts} />
      <Total part={course.parts} />
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      }
    ]
  }

  return <Course course={course} />
}

export default App