const Header = ({ header }) => {
  return <h2>{header}</h2>
}

const Total = ({ part }) => {
  const arr = part.map(section => section.exercises)
  const total = arr.reduce((acc, val) => acc + val, 0)
  return (
    <p><b>total of {total} exercises</b></p>
  )
}

const Content = ({ part }) => {
  return (
    part.map((section, i) => 
      <p key={i}>
        {section.name} {section.exercises}
      </p>
    )
  )
}

const Course = ({ courses }) => {
  return (
    courses.map((course, i) =>
      <div key={i}>
        <Header header={course.name} />
        <Content part={course.parts} />
        <Total part={course.parts} />
      </div>
    )
  )
}

const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
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
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  return ( 
    <div>
      <h1>Courses</h1>
      <Course courses={courses} />
    </div>
  )
}

export default App