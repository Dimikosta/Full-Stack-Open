const DisplayPhonebook = (people) => {
    console.log(people.data)
    return people.map((people, index) => <div key={index}>{people.name} {people.number}</div>) 
}

export default DisplayPhonebook