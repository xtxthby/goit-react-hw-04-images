

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ListItem,  Picture } from './ImageGalleryItem.styled';
import Modal from 'components/Modal';

function ImageGalleryItem({ largeImageURL, webformatURL, tags }) {
  const [showModal, setShowModal] = useState(false);
  // state = {
  //   showModal: false,
  //   largeImageURL: this.props.largeImageURL,
  // };

  const toggleModal = () => {
    setShowModal(prevState => !prevState);
  };

  return (
    <>
      <ListItem onClick={toggleModal}>
        <Picture src={webformatURL} alt={tags} />
      </ListItem>
      {showModal && (
        <Modal onClose={toggleModal} large={largeImageURL} alt={tags} />
      )}
    </>
  );
  
}

ImageGalleryItem.propTypes = {
  image: PropTypes.shape({
    webformatURL: PropTypes.string.isRequired,
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
};

export default ImageGalleryItem;






// {/* <li class="gallery-item">
//   <img src="" alt="" />
// </li> */}