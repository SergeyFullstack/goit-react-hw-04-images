import React, { useState, useEffect } from 'react';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { fetchImages } from 'api/fetch-api-gallery';
import { Loader } from './Loader/Loader';
import { Modal } from 'components/Modal/Modal';

export function App() {
  const [searchName, setSearchName] = useState('');
  const [dataImages, setDataImages] = useState([]);
  const [page, setPage] = useState(1);
  const [toggleLoader, setToggleLoader] = useState(false);
  const [toggleButton, setToggleButton] = useState(true);
  const [toggleModal, setToggleModal] = useState(false);
  const [largeImageUrl, setLargeImageUrl] = useState('');
  const [largeImageAlt, setLargeImageAlt] = useState('');

 useEffect(() => {
    if (!searchName) return;
    setToggleLoader(true);

    const getGallery = () => {
      fetchImages(searchName, page)
        .then(images => {
          if (Math.ceil(images.total / 12) <= page) {
            setToggleButton(false);
          } else {
            setToggleButton(true);
          }

          setDataImages(prevImages => {
            return [...prevImages, ...images.hits];
          });
        })
       .catch(error => console.log(error))
        .finally(() => {
          setToggleLoader(false);
        });
    }

    getGallery();
  }, [page, searchName, setDataImages]);

  const onSubmitSearch = (searchName) => {
    setSearchName(searchName);
    setDataImages([]);
    setPage(1);
  };

  const clickLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
    setToggleLoader(true);
  };

  const modalOpen = (currentImage) => {
    setLargeImageUrl(currentImage.largeImageURL);
    setLargeImageAlt(currentImage.tags);
    setToggleModal(true);
  };

  const closeModal = () => {
    setLargeImageUrl('');
    setLargeImageAlt('');
    setToggleModal(false);
  };

  return (
    <>
      <Searchbar onSubmit={onSubmitSearch} />
      {toggleLoader && <Loader widthLoader={'200'} heightLoader={'200'} />}
      <ImageGallery
        dataImages={dataImages}
        toggleButton={toggleButton}
        toggleLoader={toggleLoader}
        clickLoadMore={clickLoadMore}
        modalOpen={modalOpen}
      />
      {toggleModal && (
        <Modal url={largeImageUrl} alt={largeImageAlt} closeModal={closeModal} />
      )}
    </>
  );
}































































