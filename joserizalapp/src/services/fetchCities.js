import generic_city from '../assets/generic_city.jpg'

const fetchCities = () => {
    return [
        {
            id: 1,
            title: 'Gent',
            content: '# This is some content',
            imageUrl: generic_city,
        },
        {
            id: 2,
            title: 'Madrid',
            content: '# This is some content',
            imageUrl: generic_city,
        },
        {
            id: 3,
            title: 'Amsterdam',
            content: '# This is some content',
            imageUrl: generic_city,

        }
    ]
}

export default fetchCities