import PropTypes from 'prop-types';
import React, {useEffect } from 'react';
import { createPortal } from 'react-dom';
import { ModalBackdrop, ModalContent,
  ModalDescr, ModalPicture,
} from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

function Modal({ large, tags, onClose }) {

  useEffect(() => {
    // при розгортанні модалки вішаю слухача події
    // window.addEventListener('keydown', handleKeyDown);
    // при натисканні Escape закриваю модалку
    const handleKeyDown = e => {
      if (e.code === `Escape`) {
        onClose();
      }
    };
    // при розгортанні модалки вішаю слухача події
    window.addEventListener('keydown', handleKeyDown);
    return () => {window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  // window.removeEventListener('keydown', this.handleBackdropeClick);

  // при кліку на бекдроп закриваю модалку
  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };


  return createPortal(
    <ModalBackdrop onClick={handleBackdropClick}>
      <ModalContent>
        {/* тут більший розмір картинки */}
        <ModalPicture src={large} alt={tags} />
        {/* назва картинки */}
        <ModalDescr>{tags}</ModalDescr>
      </ModalContent>
    </ModalBackdrop>,
    modalRoot
  );
}

Modal.propTypes = {
  large: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal


