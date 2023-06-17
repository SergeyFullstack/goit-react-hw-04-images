import React from 'react';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';
import { Button } from 'components/Button/ButtonLoad';
import { GalleryList, WrapGallery } from './ImageGallery.styled';

export function ImageGallery({
  dataImages,
  toggleLoader,
  toggleButton,
  clickLoadMore,
  modalOpen,
}) {
  return (
    <>
      {dataImages.length > 0 && (
        <WrapGallery>
          <>
            <GalleryList>
              <ImageGalleryItem images={dataImages} modalOpen={modalOpen} />
            </GalleryList>
            {toggleButton && (
              <Button
                clickLoadMore={clickLoadMore}
                toggleLoader={toggleLoader}
                onClick={clickLoadMore}
              />
            )}
          </>
        </WrapGallery>
      )}
    </>
  );
}


