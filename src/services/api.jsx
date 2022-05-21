import axios from 'axios';

const API_URL = 'https://pixabay.com/api/';
const API_KEY = '25738205-42a7db76025be689580da6194';

const ImagesApiService = async (searchQuery, currentPage) => {
  try {
    const response = await axios(
      `${API_URL}?q=${searchQuery}&page=${currentPage}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
    );
    return response.data.hits;
  } catch (error) {
    console.log(error);
  }
};

export default ImagesApiService;
