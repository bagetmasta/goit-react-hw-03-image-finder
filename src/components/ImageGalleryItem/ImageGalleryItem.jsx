import PropTypes from 'prop-types';
import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';
import { Component } from 'react';

export class ImageGalleryItem extends Component {
  static propTypes = {
    hit: PropTypes.object.isRequired,
    toggleModal: PropTypes.func.isRequired,
  };

  render() {
    const { webformatURL, largeImageURL } = this.props.hit;
    const { toggleModal } = this.props;

    return (
      <GalleryItem>
        <GalleryImage
          onClick={() => toggleModal(largeImageURL)}
          src={webformatURL}
          alt=""
        />
      </GalleryItem>
    );
  }
}
