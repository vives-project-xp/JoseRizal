import generic_city from '../assets/generic_city.jpg'

import img_ghent from '../assets/generic_city_pics/Ghent.jpg'
import img_madrid from '../assets/generic_city_pics/Madrid.jpg'
import img_amsterdam from '../assets/generic_city_pics/Amsterdam.jpg'

const fetchCities = () => {
    return [
        {
            id: 1,
            title: 'Ghent',
            content: '# This is some content',
            imageUrl: img_ghent,
        },
        {
            id: 2,
            title: 'Madrid',
            content: '# This is some content',
            imageUrl: img_madrid,
        },
        {
            id: 3,
            title: 'Amsterdam',
            content: '# This is some content',
            imageUrl: img_amsterdam,

        }
    ]
}

export default fetchCities