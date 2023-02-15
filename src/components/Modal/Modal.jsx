import PropTypes from 'prop-types';
import { useEffect } from 'react';

import { ModalWindow, Overlay } from './Modal.styled';

const Modal = ({ largeImageUrl, modalToggle }) => {
  const onClose = e => {
    if (e.code === 'Escape') {
      modalToggle(largeImageUrl);
    }
  };

  const onCloseByOverlay = e => {
    if (e.target === e.currentTarget) {
      modalToggle(largeImageUrl);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', onClose);

    return () => {
      window.removeEventListener('keydown', onClose);
    };
  });

  return (
    <Overlay onClick={onCloseByOverlay}>
      <ModalWindow>
        <img src={largeImageUrl} alt="LargeImage" />
      </ModalWindow>
    </Overlay>
  );
};

Modal.propTypes = {
  largeImageUrl: PropTypes.string.isRequired,
  modalToggle: PropTypes.func.isRequired,
};

export default Modal;
