import PropTypes from 'prop-types';
import { Component } from 'react';
import { Overlay, ModalWindow } from './Modal.styled';

export class Modal extends Component {
  static propTypes = {
    largeImageURL: PropTypes.string,
    onClose: PropTypes.func.isRequired,
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      this.props.onClose();
    }
  };

  render() {
    const { largeImageURL } = this.props;

    return (
      <Overlay onClick={this.handleBackdropClick}>
        <ModalWindow>
          <img width="800" height="500" src={largeImageURL} alt="" />
        </ModalWindow>
      </Overlay>
    );
  }
}
