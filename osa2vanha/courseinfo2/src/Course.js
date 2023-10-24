const Total = (props) => {
    console.log(props.total)
    return(
      <div>
        <p>
        Number of exercises {props.total}
        </p>
      </div>
    )
  }

  const Part = (props) => {
    return(
      <div>
        <p>
          {props.name} {props.exercises}
        </p>
      </div>
    )
  }

  const Content = (props) => {
    console.log(props)
    return (
      <div>
        {props.parts.map((part, i) =>
        <div key={i}>
          <Part name={part.name} exercises={part.exercises}/>
        </div>)}
        <Total total={props.parts.reduce((sum, part)=> sum + part.exercises, 0)}/>
      </div>
    )
  }

  const Course = (props) =>{
    console.log(props)
    return(
      <div>
        <h3>
        {props.coursename}
        </h3>
        <Content parts={props.parts}/> 
      </div>
    )
  }
  

export default Course