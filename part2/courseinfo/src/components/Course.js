import React from 'react'

const Header = ({ course }) => {
    return (
        <h1>{course.name}</h1>
    )
}

const Total = ({ course }) => {
    const result = course.reduce((total, current) => total + current.exercises, 0)
    return (
        <strong>Number of exercises {result}</strong>
    )
}
const Part = ({ part }) =>
    <p>
        {part.name} {part.exercises}
    </p>

// Use map to list any number of parts
const Content = ({ parts }) => parts.map(parts => <Part part={parts} />)


const Course = ({ course }) => {
    return (
        <>
            <Header course={course} />
            <Content parts={course.parts} />
            <Total course={course.parts} />
        </>
    )
}

export default Course