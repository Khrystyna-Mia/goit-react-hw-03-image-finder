import PropTypes from 'prop-types';
import s from './ImageGalleryItem.module.css';

const ImageGalleryItem = ({ url, onToggleModal, onOpenModal }) => {
  <li className={s.item} onClick={onToggleModal}>
    <img className={s.images} src={url} alt="" onClick={onOpenModal} />
  </li>;
};

ImageGalleryItem.propTypes = {
  url: PropTypes.string.isRequired,
  onToggleModal: PropTypes.func.isRequired,
  onOpenModal: PropTypes.func.isRequired,
};

export default ImageGalleryItem;
