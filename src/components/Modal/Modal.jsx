import PropTypes from 'prop-types';
import * as basicLightbox from 'basiclightbox';

export const Modal = ({ largeImageURL, onClose }) => {
  const instance = basicLightbox.create(`
    <div class="Overlay">
      <div class="Modal">
        <img width="800" height="500" src="${largeImageURL}" alt="" />
      </div>
    </div>
`);

  instance.show();

  const forCloseBtn = e => {
    if (e.key === 'Escape') {
      closeModalByEscape();
      onClose();
      document.removeEventListener('keydown', forCloseBtn);
    }
  };

  document.addEventListener('keydown', forCloseBtn);

  const closeModalByEscape = () => {
    instance.close();
  };
};

Modal.propTypes = {
  largeImageURL: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

// export class Modal extends Component {
//   state = {
//     shouldModalOpen: true,
//   };

//   componentDidMount() {
//     document.addEventListener('keydown', e => {
//       if (e.code === 'Escape') {
//         console.log('Escape');
//         this.setState({ shouldModalOpen: false });
//       }
//     });
//   }

//   render() {
//     const { largeImageURL } = this.props;
//     const { shouldModalOpen } = this.state;

//     const instance = basicLightbox.create(`
//     <div class="Overlay">
//       <div class="Modal">
//         <img width="800" height="500" src="${largeImageURL}" alt="" />
//       </div>
//     </div>
// `);

//     return shouldModalOpen ? instance.show() : instance.close();
//   }
// }
