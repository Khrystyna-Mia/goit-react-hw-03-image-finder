import PropTypes from 'prop-types';
import ImageGalleryItem from 'components/ImageGalleryItem';
import s from './ImageGallery.module.css';

const ImageGallery = ({ images, onToggleModal, onOpenModal }) => {
  return (
    <ul className={s.list}>
      {images.map(({ id, webformatURL }) => (
        <ImageGalleryItem
          key={id}
          URL={webformatURL}
          onOpenModal={onOpenModal}
          oonToggleModal={onToggleModal}
        />
      ))}
    </ul>
  );
};

ImageGallery.propTypes = {
  onToggleModal: PropTypes.func.isRequired,
  onOpenModal: PropTypes.func.isRequired,
  images: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default ImageGallery;
