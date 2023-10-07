import axios from "axios";

const searchParams = new URLSearchParams({
    key: '38891748-11b65a2738d0d93056d31f78c',
    image_type: 'photo',
    orientation: 'horizontal',
    per_page: 12,
});

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchImages = async (query, page) => {

    const response = await axios.get(`?q=${query}&page=${page}&${searchParams}`);

    const data = response.data;

    return data;

};
