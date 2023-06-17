import React from 'react';
import PropTypes from 'prop-types';
import { GalleryItem, Image } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ images, modalOpen }) => {
  const handleModalOpen = (e) => {
    const currentImage = images.find((image) => image.webformatURL === e.target.src);
    modalOpen(currentImage);
  };

  return (
    <>
      {images.map((image) => (
        <GalleryItem key={image.webformatURL}>
          <Image src={image.webformatURL} alt={image.tags} onClick={handleModalOpen} />
        </GalleryItem>
      ))}
    </>
  );
};

ImageGalleryItem.propTypes = {
  modalOpen: PropTypes.func.isRequired,
  images: PropTypes.array.isRequired,
};












































