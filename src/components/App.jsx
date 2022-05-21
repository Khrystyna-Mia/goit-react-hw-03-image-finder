import { useState, useEffect } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImagesApiService from 'services/api';

import Container from './Container';
import Searchbar from './Searchbar';
import Loader from './Loader';
import ImageGallery from './ImageGallery';
import Modal from './Modal';
import Button from './Button';

const App = () => {
  const [images, setImages] = useState([]);
  const [searchQuery, setQuery] = useState('');
  const [currentPage, setPage] = useState(1);
  const [largeImageURL, setLargeImageURL] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [showModal, setModal] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchQuery) return;

    const fetchImage = async () => {
      try {
        setLoading(true);

        const images = await ImagesApiService(searchQuery, currentPage);
        setImages(prevImages => [...prevImages, ...images]);
      } catch (error) {
        setError({ error });
      } finally {
        setLoading(false);
      }
    };

    fetchImage();
  }, [searchQuery, currentPage]);

  const onSearchFormSubmit = query => {
    setImages([]);
    setQuery(query);
    setPage(1);
    setLargeImageURL('');
    setLoading(false);
    setModal(false);
    setError(null);
  };

  const onToggleModal = () => {
    setModal(showModal => !showModal);
  };

  const onOpenModal = webformatURL => {
    setLargeImageURL(webformatURL);
    setModal(true);
  };

  const onLoadMore = async () => {
    setLoading(true);
    setPage(prevPage => prevPage + 1);
  };

  return (
    <Container>
      {error && <p>{error}</p>}

      <Searchbar onSubmit={onSearchFormSubmit} />

      {
        <ImageGallery
          images={images}
          onToggleModal={onToggleModal}
          onOpenModal={onOpenModal}
        />
      }

      {isLoading && <Loader />}

      {showModal && <Modal onClose={onToggleModal} url={largeImageURL} />}

      {images.length >= 12 && (
        <Button onLoadMore={onLoadMore} isLoading={isLoading} />
      )}

      <ToastContainer autoClose={3000} />
    </Container>
  );
};

export default App;
