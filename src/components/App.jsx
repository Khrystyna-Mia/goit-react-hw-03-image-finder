import { Component } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ImagesApiService from 'services/api';

import Container from './Container';
import Searchbar from './Searchbar';
import ImageGallery from './ImageGallery';
import Modal from './Modal';

const imagesApiService = new ImagesApiService();

class App extends Component {
  state = {
    images: [],
    query: '',
    largeImageUrl: '',
    isLoading: false,
    showModal: false,
    error: null,
  };

  componentDidUpdate(prevProps, prevState) {
    const { query } = this.state;
    imagesApiService.query = query;

    if (prevState.query !== query) {
      this.fetchImage();
    }
  }

  onSearchFormSubmit = newQuery => {
    this.state({
      query: newQuery,
    });
  };

  onToggleModal = () => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
  };

  onOpenModal = e => {
    this.setState({
      largeImageUrl: this.state.images.find(
        image => image.webformatURL === e.target.src
      ).largeImageUrl,
    });
  };

  fetchImage = async () => {
    this.setState({ isLoading: true });

    try {
      const images = await imagesApiService.fetchImg();
      this.setState({ images });
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  onLoadMore = async () => {
    this.setState({ isLoading: true });

    try {
      const images = await imagesApiService.fetchImg();
      this.setState(prevState => ({
        images: [...prevState.images, ...images],
      }));
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  render() {
    const { images, showModal, largeImageUrl } = this.state;

    return (
      <Container>
        <Searchbar onSubmit={this.onSearchFormSubmit} />

        {
          <ImageGallery
            images={images}
            onToggleModal={this.onToggleModal}
            onOpenModal={this.onOpenModal}
          />
        }

        {showModal && (
          <Modal onToggleModal={this.onToggleModal} img={largeImageUrl} />
        )}

        <ToastContainer autoClose={3000} />
      </Container>
    );
  }
}

export default App;
