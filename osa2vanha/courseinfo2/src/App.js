import Course from './Course'

const Header = (props) =>{
  return (
    <div>
      <h1>
        {props.header}
      </h1>
    </div>
  )
}


const Courses = (props) => {
  return(
    <div>
      <Header header={'WEb development'}/>
      {props.courses.map((course, i) =>
      <div key={i}>
        <Course coursename={course.name} parts={course.parts}/> 
        </div>)}
    </div>

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

  return <Courses courses={courses} />
}

export default App