import jose_rizal_img1 from '../assets/jose_rizal_clippingv2.png'

const fetchArticles = () => {
    return [
        {
            id: 1,
            title: 'Jose Rizal Landmark 1',
            preview: 'Historical site related to Dr. Jose Rizal...',
            content: '# This is some content',
            imageUrl: jose_rizal_img1,
            landmark: true
        },
        {
            id: 2,
            title: 'Jose Rizal Landmark 2',
            preview: 'Another important location in Rizal\'s life...',
            content: 'This is some content',
            imageUrl: jose_rizal_img1,
            landmark: true
        },
        {
            id: 3,
            title: 'Jose Rizal Landmark 3',
            preview: 'Memorial site honoring the national hero...',
            content: '* This is some content',
            imageUrl: jose_rizal_img1,
            landmark: false
        }
    ]
}

export default fetchArticles