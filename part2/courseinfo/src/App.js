import Course from './components/Course'

const App = () => {
  const course = [
  {
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
      },
      {
        name: 'Redux',
        exercises: 14,
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
    },
    {
      name: 'Another Course',
      id: 3,
      parts: [
        {
          name: 'Cool Stuff',
          exercises: 3,
          id: 1
        },
        {
          name: 'Bad Stuff',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]

  const result = course.map(courses => <Course course={courses}/>)

  return result
}

export default App