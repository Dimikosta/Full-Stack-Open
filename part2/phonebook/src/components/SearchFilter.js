const SearchFilter = (persons, search) => {
    if (search === '') {
        return persons
    }
    const filtered = persons.filter(person => person.name.toLowerCase().includes(search.toLowerCase()))
    return filtered;
}

// export default SearchFilter