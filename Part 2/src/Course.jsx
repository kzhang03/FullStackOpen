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

export default Course