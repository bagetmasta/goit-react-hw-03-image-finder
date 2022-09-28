import PropTypes from 'prop-types';
import { GalleryItem, GalleryImage } from './ImageGalleryItem.styled';
import { Modal } from 'components/Modal/Modal';
import { Component } from 'react';

export class ImageGalleryItem extends Component {
  state = {
    isModalOpen: false,
  };

  static propTypes = {
    hit: PropTypes.object.isRequired,
  };

  modalOpen = () => {
    this.setState({ isModalOpen: true });
  };

  modalClose = () => {
    this.setState({ isModalOpen: false });
  };

  render() {
    const { webformatURL, largeImageURL } = this.props.hit;
    const { isModalOpen } = this.state;

    return (
      <GalleryItem>
        <GalleryImage onClick={this.modalOpen} src={webformatURL} alt="" />
        {isModalOpen && (
          <Modal largeImageURL={largeImageURL} onClose={this.modalClose} />
        )}
      </GalleryItem>
    );
  }
}
