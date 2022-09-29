import PropTypes from 'prop-types';
import { ImageGalleryItem } from 'components/ImageGalleryItem/ImageGalleryItem';
import { ImageGalleryList } from './ImageGallery.styled';

export const ImageGallery = ({ hits, toggleModal }) => {
  return (
    <ImageGalleryList>
      {hits.map(hit => {
        return (
          <ImageGalleryItem hit={hit} key={hit.id} toggleModal={toggleModal} />
        );
      })}
    </ImageGalleryList>
  );
};

ImageGallery.propTypes = {
  hits: PropTypes.arrayOf(PropTypes.object).isRequired,
};
